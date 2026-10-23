/**
 * Worker de savvytrix.com.
 *
 * - POST /api/contacto: formulario de cotización → panel Savvy Sites (Solicitudes, con aviso push)
 *   y además correo con Email Routing (binding LEAD_MAIL). Basta con que uno de los dos funcione.
 *   El destino sale de la variable/secreto LEAD_TO (dirección VERIFICADA en Email Routing);
 *   el remitente es una dirección del dominio. Si algo falla responde 5xx y el sitio abre
 *   WhatsApp con los mismos datos, así ningún cliente se pierde.
 * - Todo lo demás: archivos estáticos prerenderizados (binding ASSETS).
 */
import { EmailMessage } from 'cloudflare:email';

const FROM = 'web@savvytrix.com';
const FROM_NAME = 'Sitio web Savvytrix';
const MAX_BODY = 10_000;
// savvytrix.com se administra en Savvy Sites como un cliente interno.
const SAVVY_API = 'https://yescomputo-admin.onrender.com/v1';
const SAVVY_TENANT = 'savvytrix';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/contacto') {
      if (request.method !== 'POST') return json({ detail: 'Método no permitido' }, 405);
      return handleContact(request, env);
    }
    const res = await env.ASSETS.fetch(request);
    const isHtml = (res.headers.get('content-type') || '').includes('text/html');
    if (request.method !== 'GET' || !isHtml) return res;
    // Contenido administrable del panel (vitrina, planes, preguntas…). Si tarda o falla, la
    // página sale tal cual (con el contenido escrito en el código): nunca se rompe.
    const data = await panelData(ctx);
    if (!data) return res;
    const tag = `<script id="savvy-data" type="application/json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
    return new HTMLRewriter()
      .on('head', { element: (el) => el.append(tag, { html: true }) })
      .transform(res);
  },
};

/* ------------------------------------------------------------------ datos del panel */

const PANEL_WAIT_MS = 1200;

/** /v1/site + /v1/showcase en paralelo, con caché en el borde de 2 minutos. */
async function panelData(ctx) {
  const all = Promise.all([panelGet('/site'), panelGet('/showcase')]).then(([site, showcase]) =>
    site || showcase ? { site, showcase } : null,
  );
  const timeout = new Promise((r) => setTimeout(() => r('timeout'), PANEL_WAIT_MS));
  const out = await Promise.race([all, timeout]);
  if (out === 'timeout') {
    ctx.waitUntil(all.catch(() => null)); // que termine y quede en caché para la próxima visita
    return null;
  }
  return out;
}

async function panelGet(path) {
  try {
    const r = await fetch(SAVVY_API + path, {
      headers: { Accept: 'application/json', Origin: 'https://savvytrix.com', 'X-Tenant-Slug': SAVVY_TENANT },
      cf: { cacheTtl: 120, cacheEverything: true },
    });
    return r.ok ? await r.json() : null;
  } catch {
    return null;
  }
}

async function handleContact(request, env) {
  const raw = await request.text();
  if (raw.length > MAX_BODY) return json({ detail: 'Solicitud demasiado larga.' }, 413);
  let b;
  try {
    b = JSON.parse(raw);
  } catch {
    return json({ detail: 'Solicitud inválida.' }, 400);
  }
  if (String(b.website || '').trim()) return json({ ok: true }); // robot: se ignora en silencio

  const name = clean(b.name, 120);
  const phone = clean(b.phone, 40);
  if (!name || phone.replace(/\D/g, '').length < 7) return json({ detail: 'Faltan nombre o teléfono.' }, 422);

  const business = clean(b.business, 200);
  const need = clean(b.need, 120);
  const plan = clean(b.plan, 60);
  const message = String(b.message || '').trim().slice(0, 3000);
  const source = clean(b.source, 200);

  // Los dos caminos a la vez: panel (Solicitudes) y correo. Éxito si cualquiera funciona.
  const [panel, mail] = await Promise.allSettled([
    saveLead(request, { name, phone, business, need, plan, message, source }),
    sendMail(env, { name, phone, business, need, plan, message }),
  ]);
  if (panel.status === 'rejected') console.log('panel (solicitud) falló:', panel.reason && panel.reason.message);
  if (mail.status === 'rejected') console.log('correo de contacto falló:', mail.reason && mail.reason.message);
  if (panel.status === 'fulfilled' || mail.status === 'fulfilled') return json({ ok: true });
  return json({ detail: 'No se pudo enviar la solicitud.' }, 502);
}

/** Guarda la solicitud en el panel → Solicitudes (y avisa con notificación push). */
async function saveLead(request, f) {
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json', Origin: 'https://savvytrix.com', 'X-Tenant-Slug': SAVVY_TENANT };
  const ip = request.headers.get('cf-connecting-ip');
  if (ip) headers['X-Forwarded-For'] = ip; // el API limita por IP del visitante, no la del worker
  const detail = [f.need ? `Necesita: ${f.need}` : '', f.plan ? `Plan: ${f.plan}` : '', f.message].filter(Boolean).join('\n\n');
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 9000); // el API puede estar despertando
  try {
    const r = await fetch(`${SAVVY_API}/leads`, {
      method: 'POST', headers, signal: ctrl.signal,
      body: JSON.stringify({ name: f.name, phone: f.phone, city: f.business, message: detail, source: f.source }),
    });
    if (!r.ok) throw new Error(`API ${r.status}`);
  } finally {
    clearTimeout(t);
  }
}

async function sendMail(env, { name, phone, business, need, plan, message }) {
  if (!env.LEAD_MAIL || !env.LEAD_TO) throw new Error('Correo no configurado');
  const when = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota', dateStyle: 'full', timeStyle: 'short' });
  const digits = phone.replace(/\D/g, '');
  const wa = `https://api.whatsapp.com/send?phone=${digits.length === 10 ? '57' + digits : digits}`;

  const rows = [['Nombre', name], ['WhatsApp / teléfono', phone], ['Negocio y ciudad', business], ['Necesita', need], ['Plan', plan], ['Fecha', when]]
    .filter(([, v]) => v);
  const subject = `Cotización desde savvytrix.com — ${name}${need ? ' · ' + need : ''}`;
  const text =
    `NUEVA SOLICITUD — ENTRÓ POR SAVVYTRIX.COM\n\n` +
    rows.map(([k, v]) => `${k}: ${v}`).join('\n') +
    (message ? `\n\nMensaje:\n${message}` : '') +
    `\n\nResponder por WhatsApp: ${wa}`;
  const e = escapeHtml;
  const html =
    `<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#1f2937">` +
    `<div style="background:#064e3b;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">` +
    `<div style="font-size:12px;letter-spacing:2px;color:#6ee7b7;font-weight:bold">ENTRÓ POR SAVVYTRIX.COM</div>` +
    `<div style="font-size:20px;font-weight:bold;margin-top:6px">Nueva solicitud de cotización</div></div>` +
    `<div style="border:1px solid #e5e7eb;border-top:0;padding:20px 24px;border-radius:0 0 12px 12px">` +
    `<table style="border-collapse:collapse;width:100%;font-size:14px">` +
    rows.map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;vertical-align:top">${e(k)}</td><td style="padding:6px 0"><b>${e(v)}</b></td></tr>`).join('') +
    `</table>` +
    (message ? `<div style="margin-top:16px;padding:14px 16px;background:#f0fdf4;border-left:3px solid #10b981;border-radius:6px;font-size:14px;line-height:1.55">${e(message).replace(/\n/g, '<br>')}</div>` : '') +
    `<a href="${e(wa)}" style="display:inline-block;margin-top:20px;background:#25D366;color:#0b1f12;text-decoration:none;font-weight:bold;padding:10px 18px;border-radius:999px">Responder por WhatsApp</a>` +
    `</div></div>`;

  const mimeRaw = mime({ from: `${FROM_NAME} <${FROM}>`, to: env.LEAD_TO, subject, text, html });
  await env.LEAD_MAIL.send(new EmailMessage(FROM, env.LEAD_TO, mimeRaw));
}

/* ------------------------------------------------------------------ utilidades */

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });
}

function clean(v, n) {
  return String(v || '').replace(/[\r\n]+/g, ' ').trim().slice(0, n);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function b64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (const x of bytes) bin += String.fromCharCode(x);
  return btoa(bin).replace(/.{1,76}/g, '$&\r\n').trimEnd();
}

function mime({ from, to, subject, text, html }) {
  const boundary = 'b_' + crypto.randomUUID().replace(/-/g, '');
  return [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: =?UTF-8?B?${btoa(String.fromCharCode(...new TextEncoder().encode(subject)))}?=`,
    `Message-ID: <${crypto.randomUUID()}@savvytrix.com>`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    b64(text),
    `--${boundary}`,
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    b64(html),
    `--${boundary}--`,
    '',
  ].join('\r\n');
}
