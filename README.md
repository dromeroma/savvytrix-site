# Savvytrix Solutions — Sitio corporativo

Sitio web de [savvytrix.com](https://savvytrix.com). Angular 21 (standalone, zoneless) + Tailwind v4, con todas las rutas prerenderizadas en build (SSG).

## Desarrollo

```bash
npm install
npm start            # ng serve → http://localhost:10000
npm run build        # build de producción → dist/savvy-landing/browser
```

## Despliegue — Cloudflare Workers (static assets)

Todas las rutas (`/`, `/privacidad`, `/terminos`) se prerenderizan (`src/app/app.routes.server.ts`), así que en producción solo se sirve `dist/savvy-landing/browser`. **No hay servidor Node en producción**: `src/server.ts` (Express) queda solo para `npm run serve:ssr:savvy-landing` en local.

Archivos relevantes:

| Archivo | Rol |
|---|---|
| `wrangler.jsonc` | Nombre del Worker, carpeta de assets, manejo de rutas, dominio `savvytrix.com` |
| `public/_headers` | Headers de seguridad + caché inmutable para los bundles con hash |
| `.node-version` | Node 22 en el build de Cloudflare |

Comandos:

```bash
npm run preview:cf   # build + wrangler dev (runtime de Cloudflare en local)
npm run deploy       # build + wrangler deploy (requiere `npx wrangler login`)
```

### Git integration (Workers Builds)

En Cloudflare → Workers & Pages → Create → Import a repository → `dromeroma/savvytrix-site`:

- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`
- Rama de producción: `main`

### Dominio

La zona `savvytrix.com` ya usa DNS de Cloudflare. Antes del primer deploy hay que **borrar los registros `A` de `savvytrix.com` que apuntan a Vercel** (`216.198.79.65`, `64.29.17.65`); si no, Wrangler no puede crear el custom domain. **No tocar** `app.savvytrix.com` (es la app Savvy, otro servicio).
