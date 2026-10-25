/**
 * Worker de savvytrix.com.
 *
 * - POST /api/contacto: formulario de cotización → panel Savvy Sites (Solicitudes, con aviso push)
 *   y además correo con Email Routing (binding LEAD_MAIL). Basta con que uno de los dos funcione.
 *   El destino sale de la variable/secreto LEAD_TO (dirección VERIFICADA en Email Routing);
 *   el remitente es una dirección del dominio. Si algo falla responde 5xx y el sitio abre
 *   WhatsApp con los mismos datos, así ningún cliente se pierde.
 * - http y www → 301 a https://savvytrix.com. Direcciones que no existen → 404 real (public/404.html).
 * - Todo lo demás: archivos estáticos prerenderizados (binding ASSETS).
 */
import { EmailMessage } from 'cloudflare:email';

const FROM = 'web@savvytrix.com';
const FROM_NAME = 'Sitio web Savvytrix';
const MAX_BODY = 10_000;
// savvytrix.com se administra en Savvy Sites como un cliente interno.
const SAVVY_API = 'https://yescomputo-admin.onrender.com/v1';
const SAVVY_TENANT = 'savvytrix';

// Dominio oficial: http y www redirigen aquí con 301 (Google ve un solo sitio, no copias).
const CANONICAL_HOST = 'savvytrix.com';
// Robots de vista previa (WhatsApp, redes): reciben la página sin redirigir (no siguen redirecciones).
const PREVIEW_UA = /WhatsApp|facebookexternalhit|Facebot|Twitterbot|LinkedInBot|TelegramBot|Slackbot|Discordbot|Pinterest/i;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const local = /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(url.host) || url.host.endsWith('.workers.dev');
    if (!local && !PREVIEW_UA.test(request.headers.get('user-agent') || '') &&
        (url.protocol === 'http:' || url.host === 'www.' + CANONICAL_HOST)) {
      return Response.redirect(`https://${CANONICAL_HOST}${url.pathname}${url.search}`, 301);
    }
    if (url.pathname === '/api/contacto') {
      if (request.method !== 'POST') return json({ detail: 'Método no permitido' }, 405);
      return handleContact(request, env);
    }
    const res = await env.ASSETS.fetch(request);
    const isHtml = (res.headers.get('content-type') || '').includes('text/html');
    // Solo las páginas reales (no la 404) llevan el contenido del panel.
    if (request.method !== 'GET' || !isHtml || res.status !== 200) return res;
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

const PANEL_WAIT_MS = 1200; // sin copia guardada: lo máximo que se espera al panel
const PANEL_FRESH_S = 120; // una copia de más de 2 min se sirve igual y se renueva por detrás
const PANEL_KEEP_S = 7 * 24 * 3600; // si el panel cae, se sigue usando la última copia
const PANEL_KEY = 'https://savvytrix.com/__panel-data';

/**
 * Contenido del panel (/v1/site + /v1/showcase) con "stale-while-revalidate" en la caché del
 * borde: casi siempre responde al instante con la última copia y la renueva en segundo plano.
 */
async function panelData(ctx) {
  const cache = caches.default;
  const hit = await cache.match(PANEL_KEY).catch(() => null);
  if (hit) {
    const age = (Date.now() - Number(hit.headers.get('x-saved-at') || 0)) / 1000;
    if (age > PANEL_FRESH_S) ctx.waitUntil(refreshPanel(cache).catch(() => null));
    return hit.json().catch(() => null);
  }
  const fresh = refreshPanel(cache);
  const timeout = new Promise((r) => setTimeout(() => r('timeout'), PANEL_WAIT_MS));
  const out = await Promise.race([fresh, timeout]);
  if (out === 'timeout') {
    ctx.waitUntil(fresh.catch(() => null)); // que termine y quede guardado para la próxima visita
    return null;
  }
  return out;
}

async function refreshPanel(cache) {
  const [site, showcase] = await Promise.all([panelGet('/site'), panelGet('/showcase')]);
  if (!site && !showcase) return null; // el panel no respondió: se conserva la copia anterior
  const data = { site, showcase };
  await cache.put(PANEL_KEY, new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': `max-age=${PANEL_KEEP_S}`, 'x-saved-at': String(Date.now()) },
  }));
  return data;
}

async function panelGet(path) {
  try {
    const r = await fetch(SAVVY_API + path, {
      headers: { Accept: 'application/json', Origin: 'https://savvytrix.com', 'X-Tenant-Slug': SAVVY_TENANT },
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
  // Estado de cada camino (sin datos personales), para diagnosticar si uno falla.
  const status = {
    panel: panel.status === 'fulfilled' ? 'ok' : String(panel.reason && panel.reason.message || panel.reason).slice(0, 160),
    mail: mail.status === 'fulfilled' ? 'ok' : String(mail.reason && mail.reason.message || mail.reason).slice(0, 160),
  };
  if (panel.status === 'fulfilled' || mail.status === 'fulfilled') return json({ ok: true, ...status });
  return json({ detail: 'No se pudo enviar la solicitud.', ...status }, 502);
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
