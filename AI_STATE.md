# AI_STATE.md — Estado del Proyecto Savvitrix Solutions Landing

> Última actualización: 2026-05-28

## Estado actual

El sitio corporativo de **Savvitrix Solutions** está listo en su versión `1.0.0`. La transformación desde el landing original de SavvyPOS está completa: el hero, los CTAs, el ecosistema de productos Savvy, los servicios, el proceso, las industrias y la CTA final hablan ya de la empresa multi-producto, no del POS individual. Las páginas legales (`/privacidad`, `/terminos`) fueron reescritas para cubrir tanto el ecosistema SaaS como los servicios profesionales (desarrollo, IA, mecatrónica, consultoría).

## Stack técnico

- **Angular 21.1.4** (standalone components, SSR con `@angular/ssr`)
- **TypeScript 5.9.2** (strict mode)
- **Tailwind CSS v4.1.17** via PostCSS
- **GSAP + ScrollTrigger** lazy-loaded en cliente
- **@angular/animations** para transiciones UI
- **Font: Inter** (Google Fonts) + system-ui fallback
- **Zoneless change detection**
- **SSR con Express** + hydration con event replay

## Arquitectura de archivos

```
src/app/
├── components/
│   ├── layout/           # navbar, footer
│   ├── sections/         # 9 secciones activas en la home
│   │   ├── hero/
│   │   ├── pain/                  # Propuesta de valor
│   │   ├── product-showcase/      # Ecosistema Savvy (10 apps)
│   │   ├── differentiators/       # 8 servicios
│   │   ├── how-it-works/          # Proceso 4 pasos (GSAP)
│   │   ├── benefits-by-role/      # Industrias
│   │   ├── theming-demo/          # Demo interactiva del theme
│   │   ├── testimonials/
│   │   └── final-cta/             # CTA WhatsApp
│   ├── ui/               # button, card, badge, theme-switcher, animated-counter, tab-group
│   └── shared/           # section-wrapper, mockup-frame
├── pages/
│   ├── home/
│   ├── privacy/          # Política de privacidad (Savvitrix Solutions)
│   └── terms/            # Términos y condiciones (Savvitrix Solutions)
├── directives/           # in-view, parallax
├── services/             # theme.service, scroll.service
├── models/               # theme.model, content.model
└── config.ts             # WhatsApp, URLs de apps Savvy, social
```

> Las secciones `social-proof`, `innovation` y `pricing` se mantienen como componentes en disco pero no están enlazadas en `home.component.html`. No se borraron por si se quieren reactivar.

## Configuración crítica (`src/app/config.ts`)

- WhatsApp ventas: `573135487605`
- WhatsApp soporte: `573207345154`
- SavvyPOS app: `https://app.savvypos.com`
- Resto del ecosistema: `https://app.savvytrix.com`
- Social (Instagram/LinkedIn/Twitter): aún en `#` — pendiente del negocio

## Productos del ecosistema Savvy (10)

| App | Estado |
|-----|--------|
| SavvyPOS | Disponible |
| SavvyAccounting | Disponible |
| SavvyChurch | Disponible |
| SavvyCondo | Próximamente |
| SavvyEdu | Próximamente |
| SavvyHealth | Próximamente |
| SavvyCRM | Próximamente |
| SavvyCredit | Próximamente |
| SavvyParking | Próximamente |
| SavvyFamily | Próximamente |

## SEO / Open Graph

- Meta tags completos (description, keywords, OG, Twitter)
- JSON-LD `Organization` en `index.html`
- `sitemap.xml` y `robots.txt` en `public/`
- Canonical: `https://savvitrix.com/`
- **OG image:** `public/og-image.svg` (1200×630) generada — para máxima compatibilidad con WhatsApp se recomienda convertir a PNG y reemplazar las referencias en `index.html`.

## Sistema de theming

`ThemeService` aplica `data-theme` en `<html>`:
- `light` — modo claro (default)
- `dark` — modo oscuro
- `fun-{paletteId}` — modo divertido con paleta: tropical, neon, sunset, ocean, candy, forest, lava

CSS custom properties en `src/styles.css`. Persistencia en `localStorage` (`sv-theme`, `sv-palette`).

## Rendimiento

- `@defer (on viewport)` en las secciones below-the-fold
- GSAP cargado solo en cliente vía dynamic import dentro de `afterNextRender`
- Initial bundle: ~122 kB (muy por debajo del budget de 500 kB)

## Pendientes para producción

### Bloqueantes que NO requieren código
- Reemplazar **testimonios** (`testimonials.component.ts`) por reales o casos de estudio verificables — los actuales son placeholders representativos con nombres ficticios.
- Verificar que `app.savvytrix.com` y `app.savvypos.com` estén vivas con SSL antes de promocionar.
- Confirmar dominio `savvitrix.com` desplegado con HTTPS.

### Recomendados antes de lanzar
- URLs reales de Instagram / LinkedIn / Twitter en `src/app/config.ts` (hoy son `#`).
- Datos legales de la empresa (razón social, NIT, dirección, email corporativo) — no fueron añadidos al footer ni a las páginas legales por decisión del negocio.
- Convertir `og-image.svg` a PNG para compatibilidad con WhatsApp.
- Sustituir `apple-touch-icon` por PNG 180×180 (hoy apunta a `.ico`).
- Integrar analítica (GA4 / Plausible / similar) si se quiere medir conversión.

### Mejoras nice-to-have
- Página 404 personalizada.
- `manifest.json` + PWA install prompt si se planea instalación.
- Formulario de contacto vía Formspree/EmailJS además del flujo de WhatsApp.

## Comandos

```bash
ng serve                           # Dev server (puerto configurado en angular.json)
ng build                           # Production build con SSR
ng test                            # Unit tests
npm run serve:ssr:savvy-landing    # SSR server
```
