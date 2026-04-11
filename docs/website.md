# PROMPT MAESTRO — Sitio Web Comercial SavvyPOS

> Copiar este prompt completo y ejecutar en un proyecto nuevo con Claude Code.
> Stack: Angular 20 + Tailwind CSS v4 + @angular/animations + GSAP.

---

## PROMPT

Construye el sitio web comercial de **SavvyPOS**, un sistema de punto de venta moderno para tiendas retail en Latinoamerica. El sitio debe vender el producto de forma irresistible, con estetica nivel Stripe/Linear/Vercel.

El proyecto debe ser un sitio **Angular 20** (standalone components, SSR con @angular/ssr), **Tailwind CSS v4**, **@angular/animations** + **GSAP ScrollTrigger** para animaciones avanzadas, **TypeScript 5.8**. Mobile-first, rendimiento extremo, SEO optimizado.

---

### CONTEXTO DEL PRODUCTO

SavvyPOS es un sistema POS que funciona sin internet, se instala desde el navegador, y esta disenado especificamente para el comercio latinoamericano. No es un POS generico adaptado — fue construido desde cero para tiendas reales: minimercados, farmacias, papelerias, ferreterias, tiendas de barrio, restaurantes pequenos.

**Lo que lo hace radicalmente diferente:**

1. **Funciona sin internet.** Cada venta se guarda localmente y se sincroniza cuando vuelve la conexion. Cero ventas perdidas. El cajero nunca para.

2. **Se instala en 10 segundos.** Es una PWA. No necesita descargar nada, no necesita hardware especial, no necesita Windows. Funciona en cualquier dispositivo con navegador: tablet vieja, celular, laptop, Chromebook.

3. **WhatsApp nativo.** Envia facturas, recordatorios de cobro y reportes Z automaticamente por WhatsApp. No es un addon — esta integrado en el flujo natural de cada operacion.

4. **Sistema de fiado integrado.** Credito informal con limites, abonos parciales, historial y recordatorios automaticos. El fiado es la realidad del comercio latino — SavvyPOS lo digitaliza sin friccion.

5. **Nequi QR nativo.** Genera el codigo QR de pago directamente en el POS. El cajero confirma y la venta queda registrada. Sin pasarela, sin comisiones extras.

6. **Multi-tienda, multi-caja, multi-cajero.** Un dueno con 3 tiendas y 8 cajeros lo gestiona todo desde un solo login. Cada tienda tiene sus datos aislados.

7. **Dashboard inteligente por rol.** El cajero ve su rendimiento personal (ventas por hora, ticket promedio, errores). El dueno ve el panorama completo (ranking de cajeros, tendencias, alertas de inventario, filtro por cajero).

8. **Facturacion electronica DIAN.** Infraestructura lista para cumplimiento tributario colombiano. CUFE, resoluciones, notas de credito.

9. **Inventario con lotes y seriales.** Rastreo FEFO para productos perecederos. Seriales unicos para electronica. Todo integrado al flujo de venta.

10. **Descuentos con autorizacion OTP.** El dueno genera un codigo temporal desde su celular. El cajero lo ingresa para aplicar el descuento. Un solo uso, expira automaticamente. Cero abuso.

11. **Reporte Z automatico.** Al cerrar turno, se genera un PDF profesional y se envia por WhatsApp y email al dueno. Sin que nadie tenga que pedirlo.

12. **Export contable.** CSV compatible con Siigo y Alegra. Un clic, rango de fechas, descarga. El contador lo importa directo.

13. **14 tutoriales interactivos.** Onboarding guiado paso a paso para cada pantalla. Diferenciado por rol. Hub central para ver progreso. El cajero nuevo aprende solo.

14. **Modo oscuro completo.** Cada pantalla, cada modal, cada tutorial se adapta. No es un toggle superficial — es un sistema de diseno completo.

15. **Cotizaciones profesionales.** Crea proformas con busqueda de productos, items libres, descuentos. Cambia estados (borrador, enviada, aceptada). Imprime o comparte.

**Usuarios objetivo:**
- Duenos de tiendas retail pequenas y medianas en Colombia y LATAM
- Cadenas de 2-15 tiendas que necesitan control centralizado
- Negocios que venden fiar y necesitan control de cartera
- Comercios que no pueden depender de internet estable
- Emprendedores que quieren profesionalizar su operacion sin invertir en hardware

**Precio:** Modelo SaaS. Free tier generoso + planes pagos por tienda.

---

### SISTEMA DE THEMING (INNOVACION CLAVE)

El sitio DEBE implementar un sistema de 3 modos visuales como feature diferenciador:

#### Modo 1: Claro (default)
- Fondo blanco/gris claro
- Textos oscuros
- Acentos en el color primario de marca (azul profundo #1E3A5F con acentos vibrantes)
- Profesional, confiable, limpio

#### Modo 2: Oscuro
- Fondo gris oscuro / negro suave (#0a0a0a a #1a1a1a)
- Textos claros
- Acentos brillantes que resaltan
- Elegante, moderno, premium

#### Modo 3: Divertido / Personalizado
- El usuario elige entre 5-7 paletas predefinidas (ej: "Tropical", "Neon", "Sunset", "Ocean", "Candy", "Forest", "Lava")
- Cada paleta cambia: color primario, color de acento, gradientes del hero, color de botones, tonos de fondo
- Las transiciones entre paletas deben ser fluidas (CSS transitions en custom properties)
- Los gradientes y acentos del hero section cambian dinamicamente
- Los botones CTA cambian de color
- Los iconos/ilustraciones se tinen con la paleta activa

**Presentacion del theming en el sitio:**
- Toggle visible en la esquina superior derecha (3 iconos: sol, luna, palette)
- Al activar modo divertido, aparece un selector de paletas tipo "color swatches" con preview en tiempo real
- Incluir una micro-seccion en el sitio que diga algo como: "Un POS que se adapta a ti. Hasta los colores." con demo interactiva del theme switcher
- Este feature debe sentirse WOW — es parte de la identidad del producto

**Implementacion tecnica:**
- CSS custom properties en `:root` / `[data-theme="dark"]` / `[data-theme="fun-tropical"]` etc.
- Tailwind config extendido con los tokens de cada tema
- `ThemeService` (servicio Angular `providedIn: 'root'`) con BehaviorSubject para el tema activo + localStorage persistence
- Transiciones: `transition: color 0.3s, background-color 0.3s, border-color 0.3s`
- El servicio aplica `data-theme` en `document.documentElement` y expone `theme$` observable

---

### ESTRUCTURA DEL SITIO

#### 1. NAVBAR (sticky, blur backdrop)

- Logo SavvyPOS (izquierda)
- Links: Producto, Beneficios, Como funciona, Precios (anchor scroll)
- Theme switcher (3 modos)
- CTA: "Probar gratis" (boton primario)
- Mobile: hamburger menu con slide-in panel

#### 2. HERO SECTION

**Layout:** Split — texto izquierda, visual derecha (desktop). Full-width stacked (mobile).

**Headline:**
Escribe un headline que transmita: "Tu negocio no para. Tu sistema tampoco." La idea es que el producto funciona siempre (offline), es imparable, y hace que el negocio fluya. No uses esa frase literal — crea algo mejor, mas punch, mas moderno. Maximo 8 palabras.

**Subheadline:**
2 lineas que digan: punto de venta que funciona sin internet, se instala en segundos, y esta hecho para el comercio real de Latinoamerica. Lenguaje humano, directo, sin buzzwords.

**CTAs:**
- Primario: "Empezar gratis" (boton grande, color de acento)
- Secundario: "Ver demo" (boton outline, abre video o seccion)
- Terciario (mas pequeno debajo): icono WhatsApp + "Hablar con ventas"

**Visual derecho:**
- Mockup de dashboard del producto en una laptop/tablet
- Usar placeholder con gradiente y UI esquematica
- Efecto parallax sutil al scroll
- Floating badges animados: "Sin internet", "WhatsApp", "Multi-tienda"
- Los badges deben flotar con animacion gentle (float up/down 8px, 3s ease-in-out via CSS @keyframes)

**Detalles:**
- Gradiente de fondo sutil (adapta segun tema activo)
- Particulas o grid pattern en background (muy sutil, opacity 5-10%)
- Fade-in de elementos con stagger (@angular/animations trigger con query + stagger)

#### 3. SOCIAL PROOF BAR

Barra horizontal con scroll suave:
- "+500 tiendas ya usan SavvyPOS" (placeholder — ajustar numero real cuando exista)
- Logos placeholder de tipos de negocio (minimercado, farmacia, ferreteria, papeleria, tienda de ropa)
- Estilo: logos en grayscale, hover a color
- Animacion: marquee infinito suave (CSS @keyframes translateX)

#### 4. SECCION: POR QUE SOMOS DIFERENTES

**Titulo de seccion:** "No es otro POS. Es el que tu negocio necesita."

Grid de 3 columnas (desktop), 1 columna (mobile). 6 cards con:

| Card | Icono | Titulo | Descripcion |
|------|-------|--------|-------------|
| 1 | wifi-off | Funciona sin internet | Cada venta se guarda al instante. Cuando vuelve la conexion, se sincroniza solo. Cero ventas perdidas. |
| 2 | smartphone | Se instala en 10 segundos | Abre el link, instala, listo. Funciona en tablet, celular o laptop. Sin descargas, sin tecnico, sin hardware especial. |
| 3 | message-circle (whatsapp) | WhatsApp integrado | Facturas, cobros y reportes llegan por WhatsApp. Automatico. Como ya se comunica tu negocio. |
| 4 | handshake | Fiado digitalizado | Credito informal con control real. Limites, abonos, historial y recordatorios automaticos. |
| 5 | shield-check | Descuentos seguros | El dueno autoriza descuentos con codigo temporal desde su celular. Un uso, expira solo. |
| 6 | bar-chart | Dashboard por rol | El cajero ve su rendimiento. El dueno ve todo. Cada quien ve lo que necesita. |

**Estilo de cards:**
- Border sutil, hover con elevacion (shadow-lg)
- Icono con circulo de fondo en color de acento (opacity 10%)
- Animacion: fade-up con stagger al entrar en viewport (directiva `appInView` + @angular/animations trigger)

#### 5. SECCION: BENEFICIOS POR ROL

**Titulo:** "Disenado para cada persona en tu negocio"

Dos columnas lado a lado (desktop). Tabs en mobile.

**Columna 1: "Si eres dueno"**
- Fondo con gradiente sutil
- Icono de corona o briefcase
- Lista de beneficios (con checkmarks animados):
  - Ve las ventas de todas tus tiendas en tiempo real
  - Recibe el reporte Z por WhatsApp al cerrar cada turno
  - Controla descuentos con codigos temporales
  - Filtra estadisticas por cajero, periodo o tienda
  - Exporta datos para tu contador en un clic
  - Gestiona la cartera de fiado sin planillas
  - Configura terminales y permisos sin ayuda tecnica

**Columna 2: "Si eres cajero"**
- Fondo con gradiente complementario
- Icono de user o scan
- Lista de beneficios:
  - Aprende a usar el sistema con tutoriales paso a paso
  - Vende aunque no haya internet
  - Escanea productos, cobra, imprime. Fluido.
  - Cobra por efectivo, Nequi QR o fiado. Todo en un flujo.
  - Ve tu rendimiento: ventas por hora, ticket promedio
  - Abre y cierra caja en segundos

#### 6. SECCION: COMO FUNCIONA (Scroll Storytelling)

**Titulo:** "De cero a vendiendo en 3 pasos"

3 pasos con animacion de scroll (cada paso se revela al scrollear):

**Paso 1: "Registrate y configura"**
- Visual: mockup de pantalla de registro + configuracion de tienda
- Texto: Crea tu cuenta gratis. Agrega tu tienda, tus productos y tus cajeros. 5 minutos y estas listo.

**Paso 2: "Instala en cualquier dispositivo"**
- Visual: mockup de PWA install en tablet + celular
- Texto: Abre el link en el navegador. Instala como app. No necesitas nada mas. Funciona en la tablet vieja del mostrador.

**Paso 3: "Vende y gestiona"**
- Visual: mockup de POS en accion (carrito + pago)
- Texto: Escanea, cobra, imprime. Con o sin internet. Los reportes llegan solos por WhatsApp. Tu enfocate en vender.

**Implementacion:**
- Scroll-triggered animations con GSAP ScrollTrigger (registrado en `afterNextRender` para SSR safety)
- Cada paso tiene un visual que se transforma/aparece al scrollear
- Linea de progreso vertical conectando los 3 pasos
- Numeros grandes (01, 02, 03) con font weight bold, opacity baja

#### 7. SECCION: PRODUCTO EN ACCION

**Titulo:** "Mira lo que puedes hacer"

Tabs interactivos con preview visual. 5 tabs:

| Tab | Visual (placeholder) | Descripcion corta |
|-----|---------------------|-------------------|
| Punto de Venta | Screenshot/mockup del POS con carrito | Escanea, busca, cobra. Un flujo que no te frena. |
| Dashboard | Screenshot del dashboard owner | Toda tu operacion en una pantalla. Filtra por cajero, periodo o tienda. |
| Inventario | Screenshot de tabla de inventario | Stock en tiempo real. Lotes, seriales, alertas de bajo stock. |
| Clientes y Fiado | Screenshot de la pagina de clientes | Tu cartera de fiado digitalizada. Abonos, limites, recordatorios. |
| Reportes | Screenshot del Z-Report | Cierra turno y el reporte llega solo. Por WhatsApp y email. |

**Implementacion:**
- Tabs horizontales con underline animada (CSS transform + transition)
- Panel de contenido con crossfade (@angular/animations trigger `:enter` / `:leave` con opacity + scale)
- El visual es un `div` con rounded-2xl, shadow-2xl, border, que simula una ventana de app
- Dentro: imagen placeholder con gradiente + texto "Screenshot del [modulo]" + dimensiones sugeridas (1280x720)
- Aspect ratio 16:9

**Nota para assets:** Marcar cada placeholder con un comentario `<!-- ASSET: screenshot-pos.png (1280x720) -->` para reemplazar despues.

#### 8. SECCION: INNOVACION Y VISION

**Titulo:** "Construido para el futuro de tu negocio"

3 cards horizontales (desktop):

| Card | Icono | Titulo | Texto |
|------|-------|--------|-------|
| 1 | cpu/brain | Automatizacion real | Reportes que se envian solos. Inventario que te avisa. Codigos de descuento que expiran. Menos trabajo manual, menos errores. |
| 2 | globe | Hecho para LATAM | Fiado, Nequi, WhatsApp, facturacion DIAN. No adaptamos un producto gringo — lo construimos para tu realidad. |
| 3 | rocket | Escala sin limites | Empieza con una caja. Crece a 3 tiendas y 10 cajeros. La misma plataforma, sin migrar, sin empezar de cero. |

**Estilo:**
- Cards con borde gradiente sutil (pseudo-element con background gradient)
- Hover: escala 1.02 + shadow
- Fondo con pattern geometrico sutil

#### 9. SECCION: THEMING INTERACTIVO (Feature WOW)

**Titulo:** "Un sistema que se adapta a ti"
**Subtitulo:** "Hasta los colores."

Esta seccion es una DEMO INTERACTIVA del sistema de temas:

- Mostrar un mini-mockup del dashboard (simplificado, 300x200px aprox)
- 3 botones: Claro, Oscuro, Divertido
- Al hacer clic, el mini-mockup cambia de tema en tiempo real
- En modo divertido, aparecen los swatches de paletas
- Al cambiar paleta, TODA la pagina cambia (no solo el mockup)
- Texto al lado: "Modo claro para el dia. Oscuro para la noche. Divertido porque tu negocio tiene personalidad."

**Implementacion:**
- El mockup es un componente Angular standalone con divs que simulan cards/charts
- Los colores del mockup usan las mismas CSS custom properties del tema global
- El `ThemeService` cambia `data-theme` en `<html>`, tanto el mockup como la pagina completa transicionan

#### 10. SECCION: TESTIMONIOS

**Titulo:** "Lo que dicen nuestros usuarios"

3 cards de testimonios (placeholders para llenar despues):

```
Card 1:
"[Testimonio placeholder — dueno de minimercado sobre offline y WhatsApp]"
— Maria G., Minimercado La Esquina, Bogota

Card 2:
"[Testimonio placeholder — dueno de farmacia sobre fiado y control de inventario]"
— Carlos R., Drogueria Salud Total, Medellin

Card 3:
"[Testimonio placeholder — cajero sobre facilidad de uso y tutoriales]"
— Ana P., Cajera, Papeleria El Lapiz, Cali
```

**Estilo:**
- Cards con foto circular placeholder (avatar gradient), nombre, negocio, ciudad
- Comillas decorativas grandes (font-serif, opacity 10%, absolute positioned)
- Carousel en mobile (swipe — implementar con touch events o tiny-slider)

#### 11. SECCION: PRECIOS

**Titulo:** "Precios simples. Sin sorpresas."

3 columnas:

| Plan | Precio | Incluye |
|------|--------|---------|
| Gratis | $0/mes | 1 tienda, 1 cajero, funciones basicas, soporte por WhatsApp |
| Pro | $XX.XXX/mes por tienda | Ilimitados cajeros, multi-terminal, reportes avanzados, WhatsApp automatico, fiado, inventario completo |
| Business | Contactar | Multi-tienda, facturacion electronica DIAN, soporte prioritario, onboarding personalizado |

**Estilo:**
- Plan Pro destacado (borde de color, badge "Popular", escala ligeramente mayor)
- Cada plan con lista de features con checkmarks
- Boton CTA en cada plan
- Toggle mensual/anual con descuento

**Nota:** Los precios son placeholder. Marcar con `<!-- PRECIO: ajustar -->`.

#### 12. SECCION: CTA FINAL

**Fondo:** Gradiente completo que cambia con el tema activo.

**Titulo:** "Tu negocio merece un sistema que funcione como tu."
**Subtitulo:** "Empieza gratis. Sin tarjeta. Sin compromiso."

**Botones (3):**
1. "Empezar gratis" — boton primario grande
2. "Agendar demo" — boton outline
3. Icono WhatsApp + "Escribenos por WhatsApp" — boton verde WhatsApp con link a `https://wa.me/573003635998` (placeholder)

**Detalles:**
- Los botones tienen hover con escala + glow sutil
- Floating shapes decorativos en background (circulos, grids, muy sutil)

#### 13. FOOTER

**Estilo:** Minimalista, oscuro (independiente del tema).

**Contenido:**
- Logo + tagline ("El POS que no para.")
- 3 columnas de links:
  - Producto: Funcionalidades, Precios, Seguridad, Actualizaciones
  - Recursos: Centro de ayuda, Manual de usuario, API docs, Status
  - Empresa: Nosotros, Blog, Contacto, Trabaja con nosotros
- Redes sociales: Instagram, LinkedIn, Twitter/X, WhatsApp
- Copyright + links legales (Privacidad, Terminos)
- "Hecho con amor en Colombia para toda Latinoamerica"

---

### ESPECIFICACIONES TECNICAS

#### Stack
- **Angular 20** (standalone components, sin NgModules)
- **@angular/ssr** para Server-Side Rendering (SEO y performance)
- **TypeScript 5.8** estricto
- **Tailwind CSS v4**
- **@angular/animations** para transiciones de UI (triggers, states, transitions, stagger)
- **GSAP + ScrollTrigger** para scroll animations (registrado dentro de `afterNextRender` para compatibilidad SSR)
- **Lucide icons** via SVG inline (no depender de libreria Angular de iconos — copiar SVGs directamente)
- **Font: Inter** (via Google Fonts o self-hosted) + system-ui fallback
- Bootstrap con `bootstrapApplication()` en `main.ts`

#### Estructura de archivos
```
src/
  app/
    app.component.ts           — root component, importa layout + secciones
    app.component.html         — template principal con todas las secciones
    app.config.ts              — provideRouter, provideAnimations, provideClientHydration
    app.routes.ts              — single route '/' → LandingComponent (o todo inline)
    styles.css                 — tokens CSS, temas, Tailwind base, @keyframes
  components/
    layout/
      navbar/
        navbar.component.ts
        navbar.component.html
      footer/
        footer.component.ts
        footer.component.html
    sections/
      hero/
        hero.component.ts
        hero.component.html
      social-proof/
        social-proof.component.ts
        social-proof.component.html
      differentiators/
        differentiators.component.ts
        differentiators.component.html
      benefits-by-role/
        benefits-by-role.component.ts
        benefits-by-role.component.html
      how-it-works/
        how-it-works.component.ts
        how-it-works.component.html
      product-showcase/
        product-showcase.component.ts
        product-showcase.component.html
      innovation/
        innovation.component.ts
        innovation.component.html
      theming-demo/
        theming-demo.component.ts
        theming-demo.component.html
      testimonials/
        testimonials.component.ts
        testimonials.component.html
      pricing/
        pricing.component.ts
        pricing.component.html
      final-cta/
        final-cta.component.ts
        final-cta.component.html
    ui/
      button/
        button.component.ts        — @Input() variant, size, href
      card/
        card.component.ts
      badge/
        badge.component.ts
      theme-switcher/
        theme-switcher.component.ts — toggle 3 modos + palette selector
      animated-counter/
        animated-counter.component.ts — count-up con requestAnimationFrame
      tab-group/
        tab-group.component.ts      — tabs reutilizables con @angular/animations
    shared/
      section-wrapper/
        section-wrapper.component.ts — padding, max-width, fade-in con IntersectionObserver
      mockup-frame/
        mockup-frame.component.ts    — ventana de app con dots
  directives/
    in-view.directive.ts       — IntersectionObserver para trigger animaciones on-scroll
    parallax.directive.ts      — parallax effect ligero (scroll listener con requestAnimationFrame)
  services/
    theme.service.ts           — BehaviorSubject<ThemeMode>, localStorage, aplica data-theme en <html>
    scroll.service.ts          — GSAP ScrollTrigger registration, cleanup
  models/
    theme.model.ts             — ThemeMode, PaletteId, PALETTES constant
    content.model.ts           — textos, precios, features (type-safe)
```

#### Patron Angular
- **TODOS los componentes son standalone** (`standalone: true` en @Component)
- **No crear NgModules** — usar imports directos en cada componente
- **Signals** para estado local del componente cuando sea apropiado (Angular 20 signals)
- **@angular/animations** con triggers definidos en el decorador @Component (`animations: [trigger(...)]`)
- **GSAP** solo para scroll-driven animations complejas — las transiciones simples (hover, enter/leave, tabs) van con @angular/animations o CSS transitions
- **afterNextRender** para cualquier acceso al DOM/window (SSR safe)
- **NgOptimizedImage** (`ngSrc`) para todas las imagenes con lazy loading automatico
- **provideClientHydration()** en app.config.ts para hydration con SSR

#### Rendimiento
- Todas las imagenes con `NgOptimizedImage` (directiva `ngSrc` con `placeholder` y `priority` para above-the-fold)
- Lazy load de componentes below-the-fold con `@defer (on viewport)` (Angular 20 deferrable views)
- GSAP cargado solo en el cliente (dynamic import dentro de `afterNextRender`)
- Core Web Vitals target: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Lighthouse score target: 95+
- `provideClientHydration()` para evitar re-render completo en hydration

#### SEO
- `Title` y `Meta` services de `@angular/platform-browser` para metadata dinamica
- Schema.org SoftwareApplication JSON-LD inyectado en `index.html`
- Sitemap.xml generado como archivo estatico en `public/`
- robots.txt en `public/`
- Canonical URL via `<link rel="canonical">`
- Alt text en todas las imagenes
- SSR garantiza que los crawlers reciben HTML completo

#### Accesibilidad
- Contraste WCAG AA en todos los temas
- Focus visible en todos los interactivos (`:focus-visible` con ring)
- Aria labels en botones de icono
- Skip-to-content link
- Semantica HTML correcta (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- `@media (prefers-reduced-motion: reduce)` — desactivar animaciones

---

### COPYWRITING: REGLAS

- Lenguaje: espanol latinoamericano neutro (no espanol de Espana)
- Tono: directo, confiable, cercano pero profesional
- Prohibido: "solucion integral", "herramienta lider", "plataforma robusta", "de clase mundial", "revolucionario", "disruptivo"
- Permitido: lenguaje de calle inteligente. "Tu negocio no para." "Cobra como ya cobras." "El fiado, pero con control."
- Cada headline debe poderse leer en 2 segundos
- Cada parrafo maximo 2 lineas
- Los features se explican con beneficio, no con tecnicismo. No "sincronizacion offline bidireccional", sino "funciona sin internet y se actualiza solo"

---

### ASSETS Y PLACEHOLDERS

Marcar cada posicion de imagen con:
```html
<!-- ASSET: nombre-descriptivo.png (WxH) — Descripcion de lo que debe ir -->
```

Assets necesarios (producir despues):
1. `hero-dashboard.png` (1400x900) — Mockup del dashboard en laptop
2. `screenshot-pos.png` (1280x720) — POS con carrito y productos
3. `screenshot-dashboard.png` (1280x720) — Dashboard del dueno
4. `screenshot-inventory.png` (1280x720) — Tabla de inventario
5. `screenshot-customers.png` (1280x720) — Pagina de clientes con fiado
6. `screenshot-reports.png` (1280x720) — Z-Report
7. `avatar-1.jpg` (80x80) — Foto testimonio 1
8. `avatar-2.jpg` (80x80) — Foto testimonio 2
9. `avatar-3.jpg` (80x80) — Foto testimonio 3
10. `og-image.png` (1200x630) — Open Graph image para compartir
11. `logo.svg` — Logo SavvyPOS
12. `logo-white.svg` — Logo SavvyPOS variante blanca
13. `favicon.ico` + `icon.svg` — Favicons

Para todos los placeholders, generar un `div` con gradiente de marca + texto centrado indicando que asset va ahi.

---

### ANIMACIONES: ESPECIFICACIONES

| Elemento | Tecnologia | Animacion | Duracion | Easing |
|----------|-----------|-----------|----------|--------|
| Navbar | CSS | Blur backdrop al scroll (class toggle via scroll listener) | 200ms | ease-out |
| Hero headline | @angular/animations | Fade-up + clip-path reveal (trigger `:enter`) | 800ms | cubic-bezier(0.25, 0.46, 0.45, 0.94) |
| Hero badges | CSS @keyframes | Float (translateY 8px loop) | 3000ms | ease-in-out |
| Cards (diferenciadores) | @angular/animations | Fade-up stagger (`query(':enter', stagger(100, ...))`) | 600ms | ease-out |
| Beneficios checkmarks | CSS | Draw-in (stroke-dashoffset transition) | 400ms | ease-out |
| Paso a paso | GSAP ScrollTrigger | Scroll-linked opacity + translateY (scrub: true) | Tied to scroll | none (scrub) |
| Tab panels | @angular/animations | CrossFade (opacity 0→1 + scale 0.98→1) | 300ms | ease-out |
| Theme switch | CSS transitions | Background-color, color, border-color transition | 300ms | ease |
| Palette swatches | CSS | Scale bounce on select (transform: scale + transition) | 200ms | cubic-bezier(0.68, -0.55, 0.265, 1.55) |
| Pricing toggle | @angular/animations | Layout height animation | 300ms | ease-out |
| CTA buttons hover | CSS | Scale 1.02 + box-shadow glow | 150ms | ease-out |
| Counters | requestAnimationFrame | Animated count-up (custom directive/component) | 2000ms | ease-out |
| Social proof | CSS @keyframes | Marquee infinite scroll (translateX) | 30s | linear |

**Regla:** Si `@media (prefers-reduced-motion: reduce)`, desactivar TODAS las animaciones. Solo mantener transiciones de color del theming. Implementar con CSS media query global + check en GSAP (`gsap.matchMedia`).

---

### RESPONSIVE BREAKPOINTS

| Breakpoint | Layout |
|------------|--------|
| < 640px (mobile) | 1 columna, tabs en vez de grids, carousel testimonios, hamburger menu |
| 640-1024px (tablet) | 2 columnas, grids adaptados |
| > 1024px (desktop) | Layout completo, 3 columnas, split hero |
| > 1280px (wide) | Max-width 1280px centrado, mas padding |

---

### COLORES BASE (tema claro)

```css
:root {
  --color-primary: #1E3A5F;        /* Azul profundo — confianza */
  --color-primary-light: #2B5B8A;
  --color-accent: #00C9A7;          /* Verde-teal — accion, exito */
  --color-accent-warm: #FF6B35;     /* Naranja — urgencia, CTA secundario */
  --color-bg: #FAFBFC;
  --color-bg-alt: #F1F5F9;
  --color-text: #0F172A;
  --color-text-muted: #64748B;
  --color-border: #E2E8F0;
}
```

### Paletas modo divertido

```
Tropical:  primary=#FF6B6B  accent=#4ECDC4  bg=#FFF8F0
Neon:      primary=#A855F7  accent=#22D3EE  bg=#0F0F23
Sunset:    primary=#F97316  accent=#EC4899  bg=#FFF7ED
Ocean:     primary=#0EA5E9  accent=#06B6D4  bg=#F0F9FF
Candy:     primary=#EC4899  accent=#8B5CF6  bg=#FDF2F8
Forest:    primary=#22C55E  accent=#84CC16  bg=#F0FDF4
Lava:      primary=#EF4444  accent=#F59E0B  bg=#FEF2F2
```

---

### COMANDOS DEL PROYECTO

```bash
ng new savvypos-website --standalone --ssr --style=css --routing
cd savvypos-website
npm install gsap tailwindcss @tailwindcss/vite
ng serve                 # Dev server http://localhost:4200
ng build                 # Production build con SSR
```

---

### ENTREGABLES

1. Proyecto Angular 20 completo, funcional, que corre con `ng serve`
2. SSR configurado con `@angular/ssr` y `provideClientHydration()`
3. Todas las secciones implementadas con contenido real (no Lorem ipsum)
4. Sistema de theming completo (3 modos + 7 paletas) via `ThemeService`
5. Animaciones implementadas con @angular/animations + GSAP ScrollTrigger
6. Responsive completo (mobile-first)
7. SEO basico configurado (meta tags, JSON-LD, sitemap)
8. Placeholders de assets claramente marcados con comentarios HTML
9. Codigo limpio, tipado, componentizado (standalone components)
10. Todos los componentes standalone, sin NgModules
11. `@defer (on viewport)` para secciones below-the-fold

---

### CRITERIO DE CALIDAD

El sitio terminado debe:
- Sentirse premium al navegar (no template)
- Cargar en menos de 2 segundos (SSR + lazy load)
- Hacer que alguien quiera probar el producto en los primeros 10 segundos
- Demostrar que el producto es serio, moderno y diferente
- Funcionar perfecto en un iPhone SE y en un monitor 4K
- Hacer que el cambio de tema sea un momento "wow"
- No tener un solo pixel fuera de lugar
- Compilar sin errores con `ng build` (zero warnings idealmente)
