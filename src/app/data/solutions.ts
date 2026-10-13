/**
 * Oferta comercial de Savvytrix: 3 líneas + Marca, y soluciones por nicho.
 * Fuente única para el inicio, las páginas /soluciones/* y los PDF de ventas.
 * REGLA: solo lo que ya existe y funciona; cifras solo si son verificables.
 */

export interface Line {
  id: string;
  name: string;      // resultado que compra el cliente
  label: string;     // categoría técnica
  problem: string;
  includes: string[];
  result: string;
  billing: string;
}

export const LINES: Line[] = [
  {
    id: 'presencia',
    name: 'Que te encuentren',
    label: 'Presencia en Google',
    problem: 'Si no apareces en Google, tu cliente le compra a otro.',
    includes: [
      'Sitio web profesional, rápido en el celular',
      'Perfil de Empresa en Google y Google Maps',
      'Páginas por ciudad o zona para aparecer en tu región',
      'Artículos que responden lo que tus clientes buscan en Google',
      'Formulario y WhatsApp que llegan a tu correo y celular',
    ],
    result: 'Clientes nuevos que te llaman y te escriben.',
    billing: 'Creación + mensualidad',
  },
  {
    id: 'ventas',
    name: 'Que te compren',
    label: 'Tienda en línea',
    problem: 'Te ven, pero preguntan por WhatsApp uno por uno y se enfrían.',
    includes: [
      'Tienda en línea que tú mismo administras',
      'Pedidos por WhatsApp con código de pedido',
      'Promociones, campañas de temporada e historias en video',
      'Resultados: visitas, productos más vistos y pedidos',
      'Listo para anunciarte en Facebook, Instagram y Google',
    ],
    result: 'Pedidos claros, sin perder tiempo respondiendo lo mismo.',
    billing: 'Creación + mensualidad',
  },
  {
    id: 'operacion',
    name: 'Que tu negocio funcione',
    label: 'Sistemas de gestión',
    problem: 'Ventas, inventario y fiado en cuaderno: plata que se pierde sin darte cuenta.',
    includes: [
      'SavvyPOS: ventas, caja e inventario, aunque se vaya el internet',
      'Fiado y clientes con historial y saldo',
      'Seguimiento de servicio técnico con número de guía',
      'Reportes para saber si el negocio gana o pierde',
      'Ajustes a la medida de tu proceso',
    ],
    result: 'Control y tranquilidad, estés o no en el negocio.',
    billing: 'Mensualidad',
  },
];

export const BRAND_LINE = {
  name: 'Que te vean profesional',
  label: 'Marca',
  includes: [
    'Logo en alta calidad, listo para avisos e impresión',
    'Tarjeta de presentación digital y para imprimir',
    'Presentación comercial para tus clientes',
    'Tus redes sociales conectadas a tu sitio',
  ],
  billing: 'Pago único',
};

/** Lo que cubre la mensualidad. Solo lo que cabe en el precio mensual (ver estrategia de precios):
 *  campañas especiales y contenido nuevo se cotizan aparte. */
export const MONTHLY = [
  { title: 'Tu sitio siempre en línea', text: 'Alojamiento, dominio y certificado de seguridad (el candado) al día.' },
  { title: 'Cambios del día a día', text: 'Precios, productos, fotos y textos: nos escribes y lo actualizamos.' },
  { title: 'Promociones de temporada', text: 'Cambiamos tu portada y tus promociones para las fechas que te importan.' },
  { title: 'Informe de resultados', text: 'Visitas, productos más vistos y pedidos: sabes qué está funcionando.' },
  { title: 'Revisión de tu Google', text: 'Cuidamos tu Perfil de Empresa y que tu sitio siga apareciendo bien.' },
  { title: 'Soporte por WhatsApp', text: 'Te atiende una persona que conoce tu negocio, no un robot.' },
];

/** Qué pasa después de aceptar la cotización. */
export const ONBOARDING = [
  { title: 'Cotización por escrito', text: 'Qué incluye, cuánto cuesta la creación y cuánto la mensualidad. Sin sorpresas.' },
  { title: 'Nos envías tu información', text: 'Logo, fotos y tus productos o servicios con precios. Un Excel o fotos por WhatsApp sirven.' },
  { title: 'Diseñamos y tú apruebas', text: 'Te mostramos el avance y ajustamos hasta que te guste. Nada se publica sin tu visto bueno.' },
  { title: 'Publicamos', text: 'En tu dominio, con candado de seguridad, conectado a Google y a tu WhatsApp.' },
  { title: 'Te enseñamos a usarlo', text: 'En una llamada aprendes a cambiar precios, productos y fotos desde tu panel.' },
  { title: 'Te acompañamos cada mes', text: 'Cambios, informe de resultados y soporte por WhatsApp mientras tengas tu plan.' },
];

/** Lo que el cliente tiene al terminar (según lo contratado). */
export const DELIVERABLES = [
  'Tu dominio (tunegocio.com o .com.co)',
  'Correos con el nombre de tu negocio',
  'Sitio o tienda publicada y segura',
  'Panel para administrarla tú mismo',
  'Perfil de Empresa en Google configurado',
  'Acceso a tus resultados',
];

export const HOME_FAQS = [
  { q: '¿Cuánto cuesta?', a: 'Depende de lo que necesites. Pagas la creación una sola vez y después una mensualidad. Antes de empezar te enviamos el valor exacto por escrito; si tu presupuesto es corto, arrancamos por lo esencial y crecemos contigo.' },
  { q: '¿Cuánto tarda?', a: 'Un sitio estándar suele quedar listo en 1 a 3 semanas. Una tienda con un catálogo grande puede tomar más. También depende de qué tan rápido nos envíes tu información.' },
  { q: '¿Qué tengo que entregar?', a: 'Tu logo (si no tienes, te lo hacemos), fotos de tu negocio o productos, y la lista de lo que vendes con precios. Puede ser un Excel o fotos por WhatsApp.' },
  { q: '¿Puedo hacer cambios yo mismo?', a: 'Sí. Te entregamos un panel para cambiar precios, productos, fotos y promociones desde el celular o el computador. Y si prefieres, nos escribes y lo hacemos por ti.' },
  { q: '¿Atienden fuera de Cartagena?', a: 'Sí. Trabajamos por WhatsApp y llamadas con negocios de todo Colombia.' },
  { q: 'Ya tengo página web, ¿me sirve?', a: 'La revisamos gratis y te decimos si conviene mejorarla o hacerla nueva. Si cambias, nos encargamos de pasar tu dominio y tus correos.' },
  { q: '¿Qué pasa si dejo de pagar la mensualidad?', a: 'La mensualidad mantiene tu sitio en línea, con soporte y cambios. Si se deja de pagar, el sitio se pausa hasta que te pongas al día.' },
];

export interface Niche {
  slug: string;
  name: string;
  short: string;
  seoTitle: string;
  seoDescription: string;
  headline: string;
  intro: string;
  problems: string[];
  solutions: { title: string; text: string }[];
  lines: string[]; // ids de LINES que aplican
  caseStudy?: { client: string; place: string; text: string; url: string; host: string; img: string };
  faqs: { q: string; a: string }[];
  need: string;     // opción preseleccionada en el formulario
  waMessage: string;
}

export const NICHES: Niche[] = [
  {
    slug: 'tiendas-de-tecnologia',
    name: 'Tiendas de tecnología y celulares',
    short: 'Catálogo con precios, servicio técnico con seguimiento y recompra de equipos.',
    seoTitle: 'Tienda en línea para tiendas de tecnología y celulares | Savvytrix',
    seoDescription: 'Catálogo en línea con precios, pedidos por WhatsApp, seguimiento de servicio técnico y plan de recompra para tiendas de tecnología en Colombia.',
    headline: 'Vende más equipos y deja de responder "¿ya está mi celular?"',
    intro: 'Tu catálogo con precios en línea, tu servicio técnico con seguimiento y tu inventario en un solo lugar.',
    problems: [
      'Respondes precios por WhatsApp uno por uno todo el día.',
      'Los clientes llaman a preguntar si su equipo ya está reparado.',
      'Tu competencia aparece primero cuando buscan "computadores" en tu ciudad.',
    ],
    solutions: [
      { title: 'Catálogo con precios', text: 'Equipos, accesorios y promociones que tú actualizas desde un panel.' },
      { title: 'Seguimiento de servicio técnico', text: 'El cliente consulta el estado de su reparación con su número de guía.' },
      { title: 'Recompra y pasaporte del equipo', text: 'Recibe equipos usados como parte de pago y entrega su historial.' },
      { title: 'Pedidos por WhatsApp', text: 'El cliente arma su pedido en la página y te llega con un código.' },
    ],
    lines: ['presencia', 'ventas', 'operacion'],
    caseStudy: {
      client: 'Yes Computo',
      place: 'Cartagena',
      text: 'Más de 100 productos en 13 categorías que ellos mismos administran, promociones en portada y seguimiento de servicio técnico.',
      url: 'https://yescomputo.com/',
      host: 'yescomputo.com',
      img: 'clients/yescomputo.webp',
    },
    faqs: [
      { q: '¿Puedo actualizar precios yo mismo?', a: 'Sí. Tienes un panel para cambiar precios, fotos y promociones desde el celular o el computador.' },
      { q: '¿El cliente puede pagar en la página?', a: 'El pedido llega a tu WhatsApp con un código y tú cierras la venta como ya lo haces: transferencia, Nequi o en la tienda.' },
      { q: '¿Sirve si también reparo equipos?', a: 'Sí. El módulo de servicio técnico le da a cada reparación un número de guía para que el cliente consulte el estado.' },
    ],
    need: 'Tienda en línea',
    waMessage: 'Hola, tengo una tienda de tecnología y quiero cotizar con Savvytrix.',
  },
  {
    slug: 'ferreterias-y-materiales',
    name: 'Ferreterías, acabados y materiales',
    short: 'Catálogo por categorías, calculadoras de cantidades y pedidos por WhatsApp.',
    seoTitle: 'Catálogo en línea para ferreterías y depósitos de materiales | Savvytrix',
    seoDescription: 'Catálogo en línea por categorías, calculadora de cantidades y pedidos por WhatsApp para ferreterías, acabados y materiales de construcción.',
    headline: 'Tu catálogo completo, a un clic, y el cliente sabe cuánto comprar',
    intro: 'Muestra todo lo que vendes, ayuda al cliente a calcular cantidades y recibe pedidos ordenados.',
    problems: [
      'Tu catálogo es tan grande que es imposible mostrarlo por WhatsApp.',
      'El cliente no sabe cuántas cajas o bultos necesita y pregunta todo.',
      'No tienes claro qué hay en inventario hasta que lo buscas en la bodega.',
    ],
    solutions: [
      { title: 'Catálogo por categorías', text: 'Pisos, pinturas, herramientas… con fotos, precios y búsqueda.' },
      { title: 'Calculadoras', text: 'Ej.: metros cuadrados a cajas de piso. El cliente llega sabiendo qué pedir.' },
      { title: 'Pedidos por WhatsApp', text: 'El pedido te llega completo, con código, listo para despachar.' },
      { title: 'Inventario con SavvyPOS', text: 'Ventas e inventario al día en el mostrador.' },
    ],
    lines: ['presencia', 'ventas', 'operacion'],
    caseStudy: {
      client: 'Acabados La Troncal',
      place: 'San Onofre, Sucre',
      text: 'Catálogo de porcelanatos y acabados con calculadora de metros cuadrados a cajas y cotización por WhatsApp.',
      url: 'https://constructorsanonofre.com/',
      host: 'constructorsanonofre.com',
      img: 'clients/latroncal.webp',
    },
    faqs: [
      { q: '¿Tengo que subir todos los productos de una vez?', a: 'No. Empezamos con tus productos principales y vas agregando. Si tienes un Excel, lo cargamos por ti.' },
      { q: '¿Qué tipo de calculadoras se pueden hacer?', a: 'Metros cuadrados a cajas de piso ya está en uso; otras las construimos según lo que vendes.' },
      { q: '¿Se conecta con mi inventario?', a: 'Con SavvyPOS llevas ventas e inventario en el mostrador; lo integramos según tu operación.' },
    ],
    need: 'Tienda en línea',
    waMessage: 'Hola, tengo una ferretería / depósito de materiales y quiero cotizar con Savvytrix.',
  },
  {
    slug: 'profesionales-y-servicios',
    name: 'Profesionales y empresas de servicios',
    short: 'Aparece en Google por tu servicio y tu ciudad, y recibe cotizaciones ordenadas.',
    seoTitle: 'Página web para profesionales y empresas de servicios | Savvytrix',
    seoDescription: 'Sitio web con servicios, proyectos, páginas por ciudad y formulario de cotización para ingenieros, consultores, clínicas y empresas de servicios.',
    headline: 'Que te encuentren cuando buscan tu servicio en tu ciudad',
    intro: 'Un sitio que muestra tu experiencia, aparece en Google por cada ciudad donde trabajas y convierte visitas en cotizaciones.',
    problems: [
      'Buscan tu servicio en Google y aparecen otros, aunque tú seas mejor.',
      'Tus clientes no ven tus proyectos ni tu experiencia antes de llamarte.',
      'Las solicitudes llegan desordenadas por WhatsApp y se pierden.',
    ],
    solutions: [
      { title: 'Servicios y proyectos', text: 'Tu experiencia contada con fotos, resultados y testimonios reales.' },
      { title: 'Una página por ciudad', text: 'Aparece cuando buscan "tu servicio + tu ciudad" en cada zona donde trabajas.' },
      { title: 'Formulario de cotización', text: 'Cada solicitud llega a tu correo con nombre, teléfono y lo que necesita.' },
      { title: 'Tarjeta digital del equipo', text: 'Cada persona comparte su tarjeta con un enlace y guarda el contacto en un toque.' },
    ],
    lines: ['presencia'],
    faqs: [
      { q: '¿En cuánto tiempo aparezco en Google?', a: 'El sitio queda listo para Google desde el primer día; el posicionamiento crece con las semanas según la competencia de tu zona.' },
      { q: '¿Puedo agregar proyectos yo mismo?', a: 'Sí. Desde tu panel agregas proyectos, fotos y servicios cuando quieras.' },
      { q: '¿Sirve para varias ciudades?', a: 'Sí. Creamos una página por cada ciudad o zona donde prestas el servicio.' },
    ],
    need: 'Aparecer en Google en mi ciudad',
    waMessage: 'Hola, ofrezco servicios profesionales y quiero aparecer en Google. Quiero cotizar con Savvytrix.',
  },
  {
    slug: 'comercios-y-tiendas',
    name: 'Comercios, minimercados y tiendas de barrio',
    short: 'Sistema de ventas con fiado e inventario, y tu tienda en línea para domicilios.',
    seoTitle: 'Sistema POS y tienda en línea para minimercados y comercios | Savvytrix',
    seoDescription: 'SavvyPOS para ventas, fiado e inventario, más tienda en línea con pedidos por WhatsApp para minimercados y comercios en Colombia.',
    headline: 'Cobra rápido, controla el fiado y recibe domicilios por WhatsApp',
    intro: 'El sistema para vender en el mostrador y la tienda en línea para vender por WhatsApp, conectados.',
    problems: [
      'Llevas el fiado en un cuaderno y ya no sabes quién debe qué.',
      'Se va el internet y no puedes cobrar.',
      'Terminas el mes sin saber si ganaste o perdiste.',
    ],
    solutions: [
      { title: 'SavvyPOS', text: 'Ventas, caja e inventario. Funciona aunque se vaya el internet.' },
      { title: 'Fiado bajo control', text: 'Cada cliente con su historial, su saldo y sus abonos.' },
      { title: 'Tienda para domicilios', text: 'Tus productos en línea y los pedidos llegan a tu WhatsApp.' },
      { title: 'Reportes claros', text: 'Ventas del día, productos que más se mueven y utilidad.' },
    ],
    lines: ['operacion', 'ventas'],
    faqs: [
      { q: '¿Puedo probar el sistema antes de pagar?', a: 'Sí. SavvyPOS tiene 30 días gratis, sin tarjeta de crédito.' },
      { q: '¿Necesito comprar equipos?', a: 'No. Funciona en el computador, la tablet o el celular que ya tienes.' },
      { q: '¿Me ayudan a cargar mis productos?', a: 'Sí. Si los tienes en Excel, los cargamos por ti.' },
    ],
    need: 'Sistema de ventas (SavvyPOS)',
    waMessage: 'Hola, tengo un comercio / minimercado y quiero cotizar SavvyPOS y tienda en línea con Savvytrix.',
  },
];
