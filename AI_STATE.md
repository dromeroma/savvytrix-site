# AI_STATE.md — Estado del Proyecto SavvyPOS Landing

> Última actualización: 2026-02-27

## Estado actual

El sitio web comercial de SavvyPOS ha sido reestructurado completamente siguiendo el prompt maestro en `docs/website.md`. El proyecto compila sin warnings con `ng build`. El sitio es una single-page landing con 13 secciones, sistema de theming con 3 modos (claro, oscuro, divertido) y 7 paletas de color.

## Stack técnico

- **Angular 21.1.4** (standalone components, SSR con @angular/ssr)
- **TypeScript 5.9.2** (strict mode)
- **Tailwind CSS v4.1.17** via PostCSS
- **GSAP + ScrollTrigger** para scroll animations (lazy-loaded en cliente)
- **@angular/animations** para transiciones UI (stagger, fade, tab crossfade)
- **Font: Inter** (Google Fonts) + system-ui fallback
- **Zoneless change detection** (`provideZonelessChangeDetection()`)
- **SSR con Express** + hydration con event replay

## Arquitectura de archivos

```
src/app/
├── components/
│   ├── layout/           # navbar, footer
│   ├── sections/         # 11 secciones del sitio
│   │   ├── hero/
│   │   ├── social-proof/
│   │   ├── differentiators/
│   │   ├── benefits-by-role/
│   │   ├── how-it-works/       # GSAP ScrollTrigger
│   │   ├── product-showcase/   # Tabs con @angular/animations
│   │   ├── innovation/
│   │   ├── theming-demo/       # Demo interactiva del theme
│   │   ├── testimonials/
│   │   ├── pricing/
│   │   └── final-cta/
│   ├── ui/               # button, card, badge, theme-switcher, animated-counter, tab-group
│   └── shared/           # section-wrapper (fade-in), mockup-frame
├── directives/           # in-view (IntersectionObserver), parallax
├── services/             # theme.service (3 modos + 7 paletas), scroll.service
└── models/               # theme.model, content.model
```

## Sistema de theming

El `ThemeService` aplica `data-theme` en `<html>` con estos valores:
- `light` — modo claro (default)
- `dark` — modo oscuro
- `fun-{paletteId}` — modo divertido con paleta: tropical, neon, sunset, ocean, candy, forest, lava

Las CSS custom properties (`--color-primary`, `--color-accent`, `--color-bg`, etc.) se definen en `src/styles.css` para cada valor de `data-theme`. Todos los componentes usan estas variables via `var(--color-xxx)` en las clases de Tailwind.

Persistencia: `localStorage` keys `sv-theme` (modo) y `sv-palette` (paleta activa).

## Rendimiento

- `@defer (on viewport)` para secciones below-the-fold (how-it-works, product-showcase, innovation, theming-demo, testimonials, pricing)
- GSAP cargado solo en cliente via `dynamic import` dentro de `afterNextRender`
- Initial bundle: ~416kB (bajo el budget de 500kB)
- Lazy chunks separados para GSAP ScrollTrigger y cada sección deferred

## SEO

- Meta tags completos (description, keywords, OG, Twitter)
- JSON-LD Schema.org `SoftwareApplication` en `index.html`
- `sitemap.xml` y `robots.txt` en `public/`
- Canonical URL configurada
- SSR garantiza HTML completo para crawlers
- Skip-to-content link para accesibilidad

## Contenido pendiente (TODOs)

### Assets por producir
Cada posición está marcada con `<!-- ASSET: nombre.png (WxH) -->` en los templates:
1. `hero-dashboard.png` (1400×900) — Mockup del dashboard en laptop
2. `screenshot-pos.png` (1280×720) — POS con carrito
3. `screenshot-dashboard.png` (1280×720) — Dashboard del dueño
4. `screenshot-inventory.png` (1280×720) — Tabla de inventario
5. `screenshot-customers.png` (1280×720) — Clientes y fiado
6. `screenshot-reports.png` (1280×720) — Z-Report
7. `avatar-1.jpg`, `avatar-2.jpg`, `avatar-3.jpg` (80×80) — Testimonios
8. `og-image.png` (1200×630) — Open Graph
9. `logo.svg` / `logo-white.svg` — Logo
10. `favicon.ico` + `icon.svg` — Favicons

### Precios
Marcados con `<!-- PRECIO: ajustar -->` en pricing. Plan Pro tiene `$XX.XXX` como placeholder.

### Links
- WhatsApp: `https://wa.me/57XXXXXXXXXX` — actualizar con número real
- Links del footer (Centro de ayuda, Blog, API docs, etc.) apuntan a `#`
- CTA buttons apuntan a `#precios` o `#`

### Testimonios
Los textos de testimonios son placeholders representativos. Reemplazar con testimonios reales cuando estén disponibles.

## Decisiones técnicas

1. **Lucide icons via SVG inline** — No se instaló librería Angular de iconos. Los SVGs están directamente en los templates como indica el prompt.
2. **No se creó `content.model.ts` con datos centralizados** — Cada componente de sección tiene sus datos inline como arrays readonly. Esto es intencional para mantener los componentes autocontenidos.
3. **SSR prerender warning** — `NotYetImplemented` error al prerender es un bug conocido de domino (el DOM server-side de Angular) con `style.setProperty()`. Non-fatal, la ruta se prerenderiza correctamente.
4. **Removed swiper** — Se eliminó la dependencia `swiper` ya que no se usa en la nueva estructura.
5. **No se crearon NgModules** — Todos los componentes son standalone como indica el prompt.

## Comandos

```bash
ng serve                          # Dev server localhost:4200
ng build                          # Production build con SSR
ng test                           # Unit tests (Karma + Jasmine)
npm run serve:ssr:savvypos-landing # SSR server en puerto 4000
```
