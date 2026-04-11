# CLAUDE.md — Savvitrix Solutions Landing Page

This file provides guidance to Claude Code when working in this repository.

---

## MISIÓN PRINCIPAL (leer antes de tocar cualquier código)

Este proyecto era originalmente el landing de **SavvyPOS**. Ahora debe convertirse en el sitio web corporativo de **Savvitrix Solutions** — una empresa de tecnología multi-producto (estilo Google / Amazon) con sede en Latinoamérica.

**Objetivo:** Eliminar TODO el contenido de SavvyPOS y rediseñar/reescribir el sitio para representar a Savvitrix Solutions como empresa: sus servicios, sus productos Savvy, y su visión.

> Consulta `LANDING_CONTEXT.md` para el contexto original del proyecto (arquitectura, decisiones técnicas). No borres ese archivo.

---

## PASO 0 — Git remote

El repositorio actualmente apunta al remote de SavvyPOS. Antes de hacer cualquier commit:

```bash
git remote remove origin
```

El usuario proporcionará el nuevo URL del remote. Cuando lo dé, ejecuta:

```bash
git remote add origin <URL_QUE_DARÁ_EL_USUARIO>
git push -u origin main
```

**No hagas push hasta que el usuario confirme el nuevo remote URL.**

---

## Savvitrix Solutions — Identidad y visión

**Nombre:** Savvitrix Solutions  
**Tagline:** *"Transformamos ideas en tecnología que funciona"*  
**Mercado:** Latinoamérica  
**Idioma del sitio:** Español latinoamericano (neutro, profesional)  
**Tono:** Serio pero cercano, innovador, confiable. No demasiado corporativo. Similar al tono de Notion, Linear o Vercel.

### Qué hace Savvitrix Solutions

Savvitrix Solutions es una empresa de tecnología con tres pilares:

1. **Productos propios** — El ecosistema Savvy (software SaaS multi-tenant)
2. **Servicios de desarrollo** — Desarrollo a medida para terceros
3. **I+D e innovación** — Mecatrónica, automatización, agro-tech, IA aplicada

---

## Servicios de Savvitrix Solutions (secciones que deben aparecer en el sitio)

### Desarrollo de Software
- Desarrollo web y móvil a medida
- APIs REST y microservicios
- Integración de sistemas
- Software ERP / CRM personalizado

### Inteligencia Artificial y Automatización
- Chatbots y agentes IA
- Automatización de procesos (RPA)
- Análisis de datos e inteligencia de negocio
- Integración con modelos de lenguaje (LLM)

### Mecatrónica y Hardware
- Diseño de sistemas embebidos
- Automatización industrial
- IoT y sensores
- Prototipos y productos físicos

### Agro-Tecnología
- Software de gestión agrícola
- Sensórica y monitoreo de cultivos
- Trazabilidad de productos del campo
- Plataformas de comercialización agro

### Páginas Web y Landing Pages
- Landing pages de alto impacto
- Sitios corporativos
- Tiendas online
- Portfolios y marcas personales

### Consultoría IT y Soporte
- Auditoría tecnológica
- Arquitectura de soluciones
- Soporte y mantenimiento
- Migración a la nube

### Cursos y Capacitación
- Cursos de programación y tecnología
- Talleres de automatización
- Formación para equipos

### Videojuegos y Entretenimiento Digital
- Desarrollo de videojuegos indie
- Experiencias interactivas
- Simuladores y aplicaciones educativas

---

## Ecosistema Savvy (productos propios — sección destacada)

Estos son los productos SaaS de Savvitrix Solutions. Deben tener una sección prominente en el sitio, tipo "nuestros productos" o "apps Savvy", con tarjetas y un CTA por producto.

| App | Descripción | Estado |
|-----|-------------|--------|
| **SavvyPOS** | Sistema de punto de venta para retail latinoamericano | Disponible |
| **SavvyAccounting** | Contabilidad doble partida + estados financieros | Disponible |
| **SavvyChurch** | Gestión integral de iglesias y ministerios | Disponible |
| **SavvyCondo** | Administración de condominios y conjuntos residenciales | Próximamente |
| **SavvyEdu** | Gestión académica para instituciones educativas | Próximamente |
| **SavvyHealth** | Software para clínicas y consultorios | Próximamente |
| **SavvyCRM** | CRM para equipos de ventas y soporte | Próximamente |
| **SavvyCredit** | Gestión de créditos y cartera | Próximamente |
| **SavvyParking** | Control de parqueaderos y accesos | Próximamente |
| **SavvyFamily** | Árbol genealógico y gestión familiar | Próximamente |

Todos los productos "Disponibles" deben tener un botón "Ir a la app" (usar `#` si no hay URL aún).  
Los "Próximamente" deben mostrar un badge de `Próximamente` en lugar del botón.

El CTA principal del sitio debe invitar a registrarse en la plataforma Savvy.

---

## Estructura de secciones propuesta para el nuevo sitio

Reemplaza las secciones de SavvyPOS con estas (puedes adaptar los componentes existentes):

1. **Hero** — Headline impactante sobre Savvitrix Solutions + CTA principal ("Conoce nuestros productos" / "Habla con nosotros")
2. **Propuesta de valor** — 3-4 bullets de por qué elegir Savvitrix (experiencia, innovación, soporte local, multi-industria)
3. **Ecosistema Savvy** — Grid/cards de todos los productos Savvy (tabla de arriba)
4. **Servicios** — Las 8 categorías de servicios con íconos y descripción breve
5. **Cómo trabajamos** — Proceso: Consulta → Diseño → Desarrollo → Soporte (tipo how-it-works)
6. **Industrias** — Iglesias, Retail, Salud, Educación, Agro, Residencial, Financiero, Entretenimiento
7. **Demo del tema** — Mantener la demo interactiva de dark/light/fun (es un diferenciador visual del stack)
8. **Testimonios** — Placeholder con clientes satisfechos (reales cuando estén disponibles)
9. **Contacto / CTA Final** — "¿Tienes un proyecto en mente?" + WhatsApp + formulario de contacto básico
10. **Footer** — Links a productos, servicios, redes sociales, contacto

---

## Identidad visual

### Colores
- **Color primario:** Emerald green — `#059669` (brand-500)
- Mantener el sistema de theming existente (light / dark / fun con 7 paletas)
- El verde esmeralda debe ser el color base del modo `light` y el acento principal en `dark`

### Tipografía
- Mantener **Inter** (ya está configurada)

### Tono visual
- Profesional pero dinámico
- Amplio uso de gradientes sutiles
- Cards con bordes suaves
- Modo oscuro como primera opción de diseño (por el stack tech)

---

## Lo que NO debes tocar

- `src/app/services/theme.service.ts` — el sistema de theming funciona bien, no romperlo
- `src/styles.css` — los tokens CSS del tema (solo agregar si necesitas nuevos, no borrar los existentes)
- `src/app/directives/` — directivas de animación/in-view, funcionan bien
- `src/app/components/ui/` — componentes UI reutilizables (button, card, badge, etc.)
- La configuración de SSR + Angular (`app.config.ts`, `app.config.server.ts`, `server.ts`)
- Los archivos `tsconfig.*.json`, `angular.json`, `package.json` (a menos que necesites instalar algo)

---

## Lo que SÍ debes reemplazar/reescribir

- **Todo el contenido** de cada sección (hero copy, bullets, tarjetas, etc.)
- `src/app/config.ts` — actualizar WhatsApp, URLs de apps Savvy, links de footer
- `src/app/pages/home/` — la home que ensambla las secciones
- `src/app/components/sections/` — todas las secciones (hero, pain, social-proof, etc. → nuevas secciones de Savvitrix)
- `src/app/components/layout/navbar/` — logo + links de navegación (Productos, Servicios, Contacto)
- `src/app/components/layout/footer/` — links de footer actualizados
- `AI_STATE.md` — actualizar para reflejar el nuevo estado del proyecto
- `README.md` — actualizar con info de Savvitrix Solutions

---

## Convenciones de código (mantener las del proyecto)

- Angular 21 standalone, zoneless change detection
- TypeScript strict mode
- Tailwind CSS v4 via PostCSS
- Prettier: 100 chars, single quotes, Angular HTML parser
- Lucide icons como SVGs inline (no instalar librería de iconos)
- Todo el copy en español latinoamericano
- Links externos / contacto SOLO en `src/app/config.ts`
- Datos de secciones inline en cada componente (no crear store centralizado)

---

## Comandos

```bash
ng serve                           # Dev server en localhost:4200
ng build                           # Build de producción con SSR
npm run serve:ssr:savvypos-landing # Servidor SSR en puerto 4000 (renombrar si lo deseas)
```

---

## Flujo de trabajo esperado

1. Preguntar al usuario si tiene el nuevo remote URL antes de cualquier commit
2. Leer `LANDING_CONTEXT.md` para entender la arquitectura técnica actual
3. Reescribir sección por sección (no todo de golpe) — validar en browser entre secciones
4. Actualizar `AI_STATE.md` al final de cada sesión de trabajo
5. Hacer commit + push después de cada sección completada
6. Versión del proyecto: empezar desde `1.0.0` (esto ya no es SavvyPOS)

---

## Notas importantes

- El sitio debe funcionar **sin backend** — es un landing estático/SSR, no conecta a ninguna API
- Los formularios de contacto pueden usar un servicio de terceros (Formspree, EmailJS) o simplemente abrir WhatsApp
- No agregar dependencias pesadas innecesarias — el bundle inicial debe mantenerse bajo 500kB
- Mantener compatibilidad con prerenderizado SSR (no usar `window`/`document` fuera de `afterNextRender`)
