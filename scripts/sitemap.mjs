// Genera dist/.../sitemap.xml en cada build con las rutas reales del sitio (portada, una página por
// nicho de src/app/data/solutions.ts, privacidad y términos). La fecha es la del despliegue, así
// Google sabe que hubo cambios. Se ejecuta después de `ng build` (ver "build" en package.json).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://savvytrix.com';
// En dist (lo que se publica) y en public/ (respaldo versionado por si el build de Cloudflare solo corre `ng build`).
const OUTS = [path.join(ROOT, 'dist/savvy-landing/browser/sitemap.xml'), path.join(ROOT, 'public/sitemap.xml')];

const solutions = fs.readFileSync(path.join(ROOT, 'src/app/data/solutions.ts'), 'utf8');
const nichesBlock = solutions.slice(solutions.indexOf('export const NICHES'));
const slugs = [...nichesBlock.matchAll(/^\s{4}slug:\s*'([a-z0-9-]+)'/gm)].map((m) => m[1]);
if (!slugs.length) throw new Error('No se encontraron nichos en solutions.ts');

const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: '/', priority: '1.0', freq: 'weekly' },
  ...slugs.map((s) => ({ loc: `/soluciones/${s}`, priority: '0.8', freq: 'monthly' })),
  { loc: '/privacidad', priority: '0.2', freq: 'yearly' },
  { loc: '/terminos', priority: '0.2', freq: 'yearly' },
];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u.loc === '/' ? '/' : u.loc}</loc><lastmod>${today}</lastmod><changefreq>${u.freq}</changefreq><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`;
for (const out of OUTS) {
  if (out.includes('dist') && !fs.existsSync(path.dirname(out))) continue; // sin build previo
  fs.writeFileSync(out, xml);
}
console.log(`sitemap.xml: ${urls.length} páginas (${slugs.length} soluciones)`);
