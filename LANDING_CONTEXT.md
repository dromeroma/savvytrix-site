# Contexto para actualizar la Landing Page de SavvyPOS

> Generado desde la sesión principal del proyecto POS (10 abril 2026).
> Esta es la fuente de verdad para que la landing refleje exactamente lo que ofrece el producto.

## Producto

SavvyPOS es un sistema POS (Punto de Venta) multitenant para tiendas en Colombia. App web progresiva (PWA) que funciona offline. Backend en FastAPI, frontend en Angular 20, BD en Supabase.

**URL del app**: https://app.savvypos.com
**URL de registro**: https://app.savvypos.com/signup

## Planes y precios DEFINITIVOS

| Plan | Precio mensual | Precio anual | CTA | Destino del botón |
|---|---|---|---|---|
| **Starter** | $49.900 COP | $39.900 COP | "Probar 30 días gratis" | https://app.savvypos.com/signup |
| **Growth** | $69.900 COP | $55.900 COP | "Empezar con Growth" | https://app.savvypos.com/signup |
| **Pro** | $99.900 COP | $79.900 COP | "Empezar con Pro" | https://app.savvypos.com/signup |
| **Business** | Cotizado | — | "Cotizar por WhatsApp" | WhatsApp ventas |
| **Enterprise** | Cotizado | — | "Cotizar por WhatsApp" | WhatsApp ventas |

### Starter ($49.900/mes)
- Punto de venta completo (escaneo de barras, descuentos, múltiples pagos)
- Funciona sin internet (offline-first, se sincroniza al volver)
- Apertura y cierre de caja con cuadre automático
- Productos e inventario básico
- Soporte por WhatsApp
- 30 días gratis con todas las funciones al registrarse
- Sin tarjeta de crédito para empezar

### Growth ($69.900/mes)
- Todo en Starter, más:
- Reportes avanzados (ventas por periodo, cajero, categoría)
- Dashboard con métricas del negocio
- Cotizaciones (crear, enviar, convertir a venta)
- Sistema de fiado/crédito (cartera digitalizada, abonos, recordatorios automáticos)
- Historial de clientes

### Pro ($99.900/mes) — PLAN POPULAR / DESTACADO
- Todo en Growth, más:
- Inventario avanzado (alertas de bajo stock, importación masiva Excel)
- Módulo de compras (registro de proveedores, actualiza stock automáticamente)
- Exportaciones (Excel, PDF)
- Edición avanzada de productos (variantes, múltiples unidades de medida)
- WhatsApp automático (reportes de cierre al dueño)
- Facturas carta con 4 diseños (classic + 3 modern)
- Multi-cajero con permisos por rol (dueño, admin, cajero)

### Business (Cotizado por WhatsApp)
- Todo en Pro, más:
- Facturación electrónica DIAN (hasta 2.000 documentos/mes)
- Integraciones externas
- Acceso API
- Registro de auditoría financiera
- Control de precios
- Soporte prioritario

### Enterprise (Cotizado por WhatsApp)
- Todo en Business, más:
- Facturación electrónica DIAN (hasta 10.000 documentos/mes)
- Onboarding personalizado
- SLA garantizado
- Soporte dedicado
- Configuración a medida

## Reglas importantes

1. **DIAN NO está en Starter, Growth ni Pro**. Solo en Business y Enterprise. Si la landing menciona DIAN en Pro, QUITARLO.
2. **Starter NO es gratis**. Cuesta $49.900/mes. Lo que es gratis son los primeros 30 días de prueba (con plan Pro para que conozcan todo).
3. **Business y Enterprise NO tienen precio fijo visible**. Muestran "Cotizar" y el botón va a WhatsApp de ventas.
4. **El toggle mensual/anual** solo aplica a Starter, Growth y Pro. Business/Enterprise no tienen periodo.

## Números de contacto

| Propósito | Número | Formato WhatsApp |
|---|---|---|
| **Ventas** (landing page, cotizaciones) | 3135487605 | wa.me/573135487605 |
| **Soporte** (app, clientes activos) | 3207345154 | wa.me/573207345154 |

**La landing usa el de VENTAS (573135487605).** NO cambiarlo al de soporte.

## Social proof

- NO decir "500+ tiendas" porque aún hay ~10 tiendas registradas.
- Usar frase genérica: "Negocios de todo tipo ya confían en SavvyPOS" o similar.
- Tipos de negocio válidos: Minimercado, Farmacia, Ferretería, Papelería, Tienda de ropa, Restaurante, Panadería, Licorería.

## Testimonios actuales (pueden mantenerse o mejorarse)

1. **María G.** — Minimercado La Esquina, Bogotá — Sobre funcionar sin internet + reporte Z por WhatsApp
2. **Carlos R.** — Droguería Salud Total, Medellín — Sobre el sistema de fiado y recordatorios automáticos
3. **Ana P.** — Cajera, Papelería El Lápiz, Cali — Sobre facilidad de uso y tutoriales

## Features principales del producto (para secciones hero, diferenciadores, etc.)

### Diferenciadores clave
1. **Funciona sin internet** — Offline-first con IndexedDB. Vende aunque se caiga la red, se sincroniza automáticamente al volver.
2. **Listo en minutos** — Sin instalación, sin hardware especial. Abre el navegador y empieza a vender.
3. **Fiado digitalizado** — Cada cliente tiene historial, límites de crédito, planes de pago, scoring automático y recordatorios por WhatsApp.
4. **Multi-cajero con permisos** — Cada empleado tiene su rol (dueño, admin, cajero) con permisos específicos. Sabes quién vendió qué.
5. **Reportes al instante** — Dashboard con ventas del día/semana/mes, productos más vendidos, márgenes, reporte Z automático.
6. **Inventario inteligente** — Alertas de bajo stock, importación masiva desde Excel, módulo de compras que actualiza stock automáticamente.

### Beneficios por rol
**Para el dueño:**
- Controla su negocio desde cualquier lugar
- Reportes de cierre por WhatsApp
- Sabe cuánto vendió cada cajero
- Ve el inventario en tiempo real
- Sistema de crédito con scoring automático

**Para el cajero:**
- Interfaz simple y rápida
- Escaneo de barras
- No necesita capacitación larga
- Funciona aunque se vaya el internet

## Módulos personalizables (sección "A tu medida")
Los módulos del plan personalizado son correctos como están. Verificar que DIAN aparezca como módulo seleccionable (está bien porque es parte de la oferta para planes superiores).

## Screenshots
Las imágenes en `/public/screenshots/` (light/ y dark/) son válidas:
- screenshot-dashboard.webp
- screenshot-pos.webp
- screenshot-inventory.webp
- screenshot-customers.webp
- screenshot-health.webp
- screenshot-pwa-install.webp
- screenshot-register.webp

## SEO / Meta
- Título: "SavvyPOS — Sistema POS para tu negocio | Punto de Venta Colombia"
- Descripción: "Sistema de punto de venta que funciona sin internet. Inventario, fiado, reportes y más. Desde $49.900/mes. 30 días gratis."

## Cambios ya aplicados en disco (pendientes de push)
- pricing.component.ts: precios corregidos, DIAN removido de Pro, Business/Enterprise como "Cotizar"
- pricing.component.html: botones Business/Enterprise apuntan a WhatsApp, texto Starter actualizado
- social-proof.component.html: quitado contador "500+ tiendas"
- config.ts: WhatsApp de ventas confirmado (573135487605, sin cambio)
