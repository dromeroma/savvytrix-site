// Avisa a IndexNow (Bing, Yandex, Seznam…; Bing alimenta a ChatGPT y Copilot) las URLs del sitemap
// después de cada build en Cloudflare. Solo corre en el build de despliegue (WORKERS_CI / CI), nunca en
// builds locales, y NUNCA rompe el build: si falla, solo lo dice.
// Google no usa IndexNow: allí basta el sitemap (y "Solicitar indexación" a mano para páginas nuevas).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HOST = 'savvytrix.com';
const KEY = '4049ca9b13685776eebd0d0888b7620a'; // public/<KEY>.txt

if (!process.env.WORKERS_CI && !process.env.CI) {
  console.log('IndexNow: build local, no se avisa.');
  process.exit(0);
}

try {
  const xml = fs.readFileSync(path.join(ROOT, 'public/sitemap.xml'), 'utf8');
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  // El aviso sale mientras Cloudflare termina de publicar; Bing visita las URLs minutos después.
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
    signal: AbortSignal.timeout(15000),
  });
  console.log(`IndexNow: ${urlList.length} URLs → ${res.status}`);
} catch (err) {
  console.log(`IndexNow: no se pudo avisar (${err?.message ?? err}). El despliegue sigue normal.`);
}
