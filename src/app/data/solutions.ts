/**
 * Oferta comercial de Savvytrix: 3 líneas + Marca, y soluciones por nicho.
 * Fuente única para el inicio, las páginas /soluciones/* y los PDF de ventas.
 * REGLA: solo lo que ya existe y funciona. De los clientes NO se publican datos ni cifras
 *        (son privados): solo que son clientes y lo que se ve en su sitio público.
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
  { q: '¿Cuánto cuesta?', a: 'Pagas la creación una sola vez y después una mensualidad. Nuestros planes van desde $2.400.000 la creación y $130.000 al mes; si necesitas algo más sencillo o un proyecto más grande, te cotizamos el plan Personalizado. Antes de empezar te enviamos el valor exacto por escrito.' },
  { q: '¿Cuánto tarda?', a: 'Un sitio estándar suele quedar listo en 1 a 3 semanas. Una tienda con un catálogo grande puede tomar más. También depende de qué tan rápido nos envíes tu información.' },
  { q: '¿Qué tengo que entregar?', a: 'Tu logo (si no tienes, te lo hacemos), fotos de tu negocio o productos, y la lista de lo que vendes con precios. Puede ser un Excel o fotos por WhatsApp.' },
  { q: '¿Puedo hacer cambios yo mismo?', a: 'Sí. Te entregamos un panel para cambiar precios, productos, fotos y promociones desde el celular o el computador. Y si prefieres, nos escribes y lo hacemos por ti.' },
  { q: '¿Atienden fuera de Cartagena?', a: 'Sí. Trabajamos por WhatsApp y llamadas con negocios de todo Colombia.' },
  { q: '¿El dominio es mío?', a: 'El dominio se registra con el nombre de tu negocio que tú elijas. Nosotros lo gestionamos por ti (configuración y renovación) para que no te preocupes. Si prefieres administrarlo tú, lo acordamos desde el inicio.' },
  { q: 'Ya tengo página web, ¿me sirve?', a: 'La revisamos gratis y te decimos si conviene mejorarla o hacerla nueva. Si cambias, nos encargamos de pasar tu dominio y tus correos.' },
  { q: '¿Qué pasa si dejo de pagar la mensualidad?', a: 'La mensualidad mantiene tu sitio en línea, con soporte y cambios. Si se deja de pagar, el sitio se pausa hasta que te pongas al día.' },
];

export interface CaseStudy { client: string; place: string; text: string; url: string; host: string; img: string }

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
  caseStudy?: CaseStudy;
  moreCases?: CaseStudy[]; // otros clientes del mismo nicho (la página los muestra debajo del caso principal)
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
      text: 'Su tienda en línea: catálogo de tecnología por categorías, promociones en portada y pedidos por WhatsApp.',
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
    caseStudy: {
      client: 'JEK Ingeniería',
      place: 'La Ceja, Antioquia',
      text: 'Su sitio profesional: servicios de ingeniería estructural, páginas por zona, guías y cotización en línea.',
      url: 'https://jekingenieria.com/',
      host: 'jekingenieria.com',
      img: 'clients/jek.webp',
    },
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
  {
    slug: 'electrodomesticos-y-sonido',
    name: 'Electrodomésticos, música y sonido',
    short: 'Catálogo por categorías con fotos y precios, historias en video y pedidos por WhatsApp.',
    seoTitle: 'Tienda en línea para almacenes de electrodomésticos, música y sonido | Savvytrix',
    seoDescription: 'Tienda en línea por categorías para almacenes de electrodomésticos, instrumentos musicales, sonido y tecnología, con historias en video y pedidos por WhatsApp.',
    headline: 'Todo tu almacén en el celular de tus clientes',
    intro: 'Electrodomésticos, instrumentos, sonido y tecnología ordenados por categoría, con tus promociones al frente y pedidos que llegan a tu WhatsApp.',
    problems: [
      'Vendes de todo y es imposible mostrarlo completo por WhatsApp.',
      'Mandas las mismas fotos y precios una y otra vez.',
      'Tus clientes no se enteran de lo nuevo que llegó ni de tus ofertas.',
    ],
    solutions: [
      { title: 'Catálogo por categorías', text: 'Cada sección con su color e ícono: electrodomésticos, sonido, instrumentos, celulares…' },
      { title: 'Historias en video', text: 'Muestra productos en video corto, como en Instagram, desde tu propia página.' },
      { title: 'Promociones en portada', text: 'Tus ofertas y lo nuevo, siempre a la vista apenas entran.' },
      { title: 'Pedidos por WhatsApp', text: 'El cliente arma su pedido y te llega completo, con código.' },
    ],
    lines: ['ventas', 'presencia', 'operacion'],
    caseStudy: {
      client: 'Gardennli',
      place: 'Cartagena',
      text: 'Su tienda en línea: computadores, celulares, electrodomésticos, instrumentos musicales y sonido por categorías, con historias en video y pedidos por WhatsApp.',
      url: 'https://gardennli.savvytrix.com/',
      host: 'gardennli.savvytrix.com',
      img: 'clients/gardennli.webp',
    },
    faqs: [
      { q: '¿Puedo tener muchas categorías?', a: 'Sí. Creas las que necesites y cada una puede tener su propio color e ícono.' },
      { q: '¿Cómo subo los videos de las historias?', a: 'Desde tu panel, con videos verticales grabados con el celular. Si prefieres, nos los envías y los subimos.' },
      { q: '¿Puedo mostrar precios con descuento?', a: 'Sí. Pones el precio normal y el de oferta, y la página muestra el ahorro.' },
    ],
    need: 'Tienda en línea',
    waMessage: 'Hola, tengo un almacén de electrodomésticos / música / sonido y quiero cotizar con Savvytrix.',
  },
  {
    slug: 'viveros-y-jardineria',
    name: 'Viveros, plantas y jardinería',
    short: 'Catálogo de plantas, materas y abonos con fotos, y pedidos por WhatsApp.',
    seoTitle: 'Tienda en línea para viveros y jardinería | Savvytrix',
    seoDescription: 'Catálogo en línea para viveros: plantas, flores, materas, sustratos y abonos por categorías, con pedidos por WhatsApp y presencia en Google Maps.',
    headline: 'Que vean tus plantas antes de ir al vivero',
    intro: 'Plantas, flores, materas, sustratos y abonos con fotos y precios, organizados para que el cliente encuentre y pida fácil.',
    problems: [
      'Te preguntan todo el día "¿tienes esta planta?" y "¿cuánto vale?".',
      'Las fotos de tus plantas se pierden en los estados de WhatsApp.',
      'Cuando buscan "vivero" en tu ciudad, no apareces.',
    ],
    solutions: [
      { title: 'Catálogo por categorías', text: 'Flores, plantas de interior, ornamentales, materas, sustratos, semillas y herramientas.' },
      { title: 'Fotos que venden', text: 'Cada planta con su foto, su precio y su descripción.' },
      { title: 'Pedidos por WhatsApp', text: 'El cliente elige sus plantas y el pedido te llega completo.' },
      { title: 'Aparece en Google Maps', text: 'Perfil de Empresa para que te encuentren cuando buscan un vivero cerca.' },
    ],
    lines: ['ventas', 'presencia'],
    caseStudy: {
      client: 'Vivero Rehobot',
      place: 'Apartadó, Antioquia',
      text: 'Su tienda en línea: flores, plantas, materas, sustratos y abonos organizados por categoría, con pedidos por WhatsApp.',
      url: 'https://viverorehobot.savvytrix.com/',
      host: 'viverorehobot.savvytrix.com',
      img: 'clients/viverorehobot.webp',
    },
    faqs: [
      { q: '¿Y si mis plantas cambian según la temporada?', a: 'Desde tu panel marcas lo que hay disponible y lo que se agotó, en segundos.' },
      { q: '¿Puedo vender también materas y abonos?', a: 'Sí. Todo lo que vendes va en el mismo catálogo, cada cosa en su categoría.' },
      { q: '¿Hacen domicilios por la página?', a: 'El pedido te llega por WhatsApp y tú coordinas la entrega como ya lo haces.' },
    ],
    need: 'Tienda en línea',
    waMessage: 'Hola, tengo un vivero y quiero cotizar con Savvytrix.',
  },
  {
    slug: 'artesanias-y-hecho-a-mano',
    name: 'Artesanías y productos hechos a mano',
    short: 'Colecciones con su historia, piezas personalizables y pedidos por WhatsApp.',
    seoTitle: 'Tienda en línea para artesanías y emprendimientos hechos a mano | Savvytrix',
    seoDescription: 'Tienda en línea para artesanos y emprendimientos: colecciones, piezas personalizables, tiempos de elaboración, ideas de regalo y pedidos por WhatsApp.',
    headline: 'Que tu trabajo hecho a mano se vea como lo que es: único',
    intro: 'Una tienda que cuenta la historia de cada pieza, deja que el cliente la personalice y te envía el pedido por WhatsApp.',
    problems: [
      'Tus piezas se ven pequeñas y perdidas entre tantas publicaciones en redes.',
      'Cada encargo personalizado son 20 mensajes para acordar colores y detalles.',
      'Te preguntan una y otra vez cuánto tarda un pedido.',
    ],
    solutions: [
      { title: 'Colecciones con historia', text: 'Cada colección y cada pieza con su frase, sus fotos y lo que la hace especial.' },
      { title: 'Piezas personalizables', text: 'El cliente elige colores, nombres o detalles antes de pedir.' },
      { title: 'Tiempo de elaboración', text: 'Cada pieza dice cuántos días tarda: menos preguntas, clientes tranquilos.' },
      { title: 'Ideas y preguntas frecuentes', text: 'Ideas de regalo y respuestas listas que tú editas desde tu panel.' },
    ],
    lines: ['ventas', 'presencia'],
    caseStudy: {
      client: 'Lui Crochet',
      place: 'Apartadó, Antioquia',
      text: 'Su tienda artesanal: colecciones tejidas a mano, piezas personalizables, ideas de regalo y pedidos por WhatsApp.',
      url: 'https://lui-crochet.savvytrix.com/',
      host: 'lui-crochet.savvytrix.com',
      img: 'clients/luicrochet.webp',
    },
    faqs: [
      { q: '¿Puedo no mostrar precios y que me pidan cotización?', a: 'Sí. Cada pieza puede mostrar su precio o un botón para cotizar por WhatsApp.' },
      { q: '¿Sirve si hago pedidos por encargo?', a: 'Sí. El cliente indica lo que quiere personalizar y te llega todo en el pedido.' },
      { q: '¿Puedo cambiar las fotos sin ayuda?', a: 'Sí. Desde tu panel subes fotos, piezas y colecciones cuando quieras.' },
    ],
    need: 'Tienda en línea',
    waMessage: 'Hola, tengo un emprendimiento de artesanías / hecho a mano y quiero cotizar con Savvytrix.',
  },
  {
    slug: 'pastelerias-y-reposteria',
    name: 'Pastelerías, repostería y postres',
    short: 'Tortas por ocasión, diseños personalizados y cotización por WhatsApp.',
    seoTitle: 'Página web para pastelerías y reposterías | Savvytrix',
    seoDescription: 'Tienda en línea para pastelerías y reposterías: tortas por ocasión, diseños personalizados, galería de inspiración y cotización por WhatsApp.',
    headline: 'Que tus tortas se antojen desde el celular',
    intro: 'Muestra tus creaciones como se merecen, deja que el cliente elija ocasión y estilo, y recibe la cotización lista por WhatsApp.',
    problems: [
      'Envías las mismas fotos de tortas una y otra vez por WhatsApp.',
      'Cada cotización empieza con diez preguntas: tamaño, sabor, fecha y diseño.',
      'Tus mejores trabajos se pierden entre las publicaciones de Instagram.',
    ],
    solutions: [
      { title: 'Tortas por ocasión', text: 'Cumpleaños, bodas, baby shower… cada diseño en su categoría, con fotos grandes.' },
      { title: 'Diseños por encargo', text: 'Cuando cada torta es única, en lugar del precio aparece "Cotizar" y el cliente cuenta lo que quiere.' },
      { title: 'Cotización por WhatsApp', text: 'El pedido te llega con los detalles, listo para responder.' },
      { title: 'Inspiración', text: 'Ideas y referencias que tú subes desde tu panel para que el cliente elija.' },
    ],
    lines: ['ventas', 'presencia'],
    caseStudy: {
      client: 'Mary Cake & Dessert',
      place: 'Barranquilla',
      text: 'Su tienda de tortas personalizadas: diseños por ocasión, galería de inspiración y cotización por WhatsApp.',
      url: 'https://marycake.savvytrix.com/',
      host: 'marycake.savvytrix.com',
      img: 'clients/marycake.webp',
    },
    faqs: [
      { q: '¿Puedo mostrar tortas sin precio?', a: 'Sí. Cada torta puede mostrar su precio o el botón "Cotizar" por WhatsApp, ideal para diseños personalizados.' },
      { q: '¿Puedo subir mis nuevas creaciones?', a: 'Sí. Desde tu panel subes fotos, tortas y categorías cuando quieras.' },
      { q: '¿Sirve si también vendo postres y cupcakes?', a: 'Sí. Todo va en el mismo catálogo, cada producto en su categoría.' },
    ],
    need: 'Tienda en línea',
    waMessage: 'Hola, tengo una pastelería / repostería y quiero cotizar con Savvytrix.',
  },
  {
    slug: 'belleza-y-accesorios',
    name: 'Belleza, cuidado personal y accesorios',
    short: 'Catálogo por categorías, medios de pago claros y pedidos por WhatsApp.',
    seoTitle: 'Tienda en línea para belleza, cuidado personal y accesorios | Savvytrix',
    seoDescription: 'Tienda en línea para emprendimientos de belleza y accesorios: catálogo por categorías, medios de pago, pedidos por WhatsApp y tu propio dominio.',
    headline: 'Una tienda tan bonita como lo que vendes',
    intro: 'Tus productos organizados por categoría, con fotos que lucen, tus medios de pago claros y pedidos que llegan completos a tu WhatsApp.',
    problems: [
      'Te preguntan precio y disponibilidad de cada producto por mensaje.',
      'Tu catálogo vive en historias de Instagram que desaparecen en 24 horas.',
      'No tienes una dirección propia y profesional para compartir tu tienda.',
    ],
    solutions: [
      { title: 'Catálogo por categorías', text: 'Accesorios, cuidado capilar, marcas… cada producto con sus fotos y su descripción.' },
      { title: 'Pedidos por WhatsApp', text: 'El cliente arma su pedido en la página y te llega con un código.' },
      { title: 'Medios de pago visibles', text: 'Nequi, transferencias y demás, explicados en la página para cerrar la venta más rápido.' },
      { title: 'Tu propio dominio', text: 'Tu tienda en tumarca.com, lista para compartir en redes con su propia imagen.' },
    ],
    lines: ['ventas', 'presencia'],
    caseStudy: {
      client: 'Jolie Chevelure',
      place: 'Cartagena',
      text: 'Su tienda en línea de accesorios y cuidado del cabello: catálogo por categorías, medios de pago y pedidos por WhatsApp, en su propio dominio.',
      url: 'https://joliechevelure.com/',
      host: 'joliechevelure.com',
      img: 'clients/jolie.webp',
    },
    faqs: [
      { q: '¿Necesito un local físico?', a: 'No. Puedes vender solo en línea: la página muestra tu ciudad, tu WhatsApp y tus medios de pago.' },
      { q: '¿Puedo tener mi propio dominio?', a: 'Sí. Lo registramos con el nombre de tu marca y configuramos todo, incluida la imagen que sale al compartir el enlace en redes.' },
      { q: '¿Puedo agregar productos nuevos?', a: 'Sí. Desde tu panel subes productos, fotos y precios cuando quieras.' },
    ],
    need: 'Tienda en línea',
    waMessage: 'Hola, tengo un emprendimiento de belleza / accesorios y quiero cotizar con Savvytrix.',
  },
  {
    slug: 'empresas-de-internet',
    name: 'Empresas de internet y telecomunicaciones',
    short: 'Página empresarial con planes, cobertura, test de velocidad, pago de factura y PQR.',
    seoTitle: 'Página web para empresas de internet y proveedores de fibra óptica | Savvytrix',
    seoDescription: 'Páginas empresariales para proveedores de internet: planes, cobertura, test de velocidad, pago de factura, PQR y normatividad, con contacto por WhatsApp.',
    headline: 'Que tus clientes contraten, paguen y te encuentren sin llamar',
    intro: 'Una página empresarial a la altura de tu red: planes claros, cobertura, test de velocidad y atención al usuario en un solo lugar.',
    problems: [
      'Tu línea de atención se llena de preguntas por planes y cobertura.',
      'Los usuarios no saben dónde pagar la factura ni cómo radicar una PQR.',
      'Tu competencia se ve más grande y más confiable en internet.',
    ],
    solutions: [
      { title: 'Planes y cobertura', text: 'Tus planes con precios y beneficios, y las zonas donde llegas.' },
      { title: 'Test de velocidad', text: 'El usuario mide su conexión desde tu propia página.' },
      { title: 'Pago de factura y PQR', text: 'Accesos directos para pagar y radicar peticiones, quejas y reclamos.' },
      { title: 'Normatividad y confianza', text: 'Información al usuario, políticas y datos de la empresa siempre a la vista.' },
    ],
    lines: ['presencia'],
    caseStudy: {
      client: 'SIR Telecomunicaciones',
      place: 'Córdoba',
      text: 'Su página empresarial: planes de fibra óptica, test de velocidad, pago de factura, radicación de PQR y normatividad.',
      url: 'https://sirtel.com.co/',
      host: 'sirtel.com.co',
      img: 'clients/sirtel.webp',
    },
    moreCases: [
      {
        client: 'Fibratek',
        place: 'San Pelayo, Córdoba',
        text: 'Página empresarial con planes, cobertura, test de velocidad y contacto directo.',
        url: 'https://fibratek.com.co/',
        host: 'fibratek.com.co',
        img: 'clients/fibratek.webp',
      },
    ],
    faqs: [
      { q: '¿Se puede conectar con mi pasarela de pagos?', a: 'Sí. Enlazamos el botón de pago con la plataforma que ya usas para recaudar.' },
      { q: '¿Puedo cambiar los planes yo mismo?', a: 'Sí, o nos escribes y los actualizamos dentro de tu mensualidad.' },
      { q: '¿Incluye las páginas de normatividad?', a: 'Sí. Organizamos la información al usuario y las políticas que nos entregues.' },
    ],
    need: 'Página web para mi negocio',
    waMessage: 'Hola, tengo una empresa de internet / telecomunicaciones y quiero cotizar una página con Savvytrix.',
  },
  {
    slug: 'software-para-negocios',
    name: 'Software y sistemas para tu negocio',
    short: 'Punto de venta, inventario, servicio técnico y ajustes a la medida de tu proceso.',
    seoTitle: 'Software para negocios: punto de venta, inventario y sistemas a la medida | Savvytrix',
    seoDescription: 'SavvyPOS para ventas, inventario y fiado, seguimiento de servicio técnico y sistemas ajustados al proceso de tu negocio en Colombia.',
    headline: 'Deja el cuaderno y el Excel: tu negocio en un sistema',
    intro: 'Software hecho por nosotros, que mejoramos con lo que piden nuestros clientes, y ajustado a la forma en que trabajas.',
    problems: [
      'Tu información está regada en cuadernos, Excel y chats.',
      'No sabes con certeza cuánto vendiste ni qué hay en inventario.',
      'Los programas que encuentras no se adaptan a cómo trabaja tu negocio.',
    ],
    solutions: [
      { title: 'SavvyPOS', text: 'Ventas, caja, inventario y fiado. Funciona aunque se vaya el internet.' },
      { title: 'Servicio técnico con guía', text: 'Cada orden con número de guía para que el cliente consulte su estado.' },
      { title: 'Reportes para decidir', text: 'Ventas, productos que más se mueven y utilidad, sin hacer cuentas.' },
      { title: 'Ajustes a la medida', text: 'Adaptamos el sistema a tu proceso: lo cotizamos después de conocer tu negocio.' },
    ],
    lines: ['operacion'],
    caseStudy: {
      client: 'SavvyPOS',
      place: 'Desarrollo propio',
      text: 'Nuestro sistema de punto de venta para tiendas: ventas, inventario y fiado, aunque se vaya el internet. Pruébalo 30 días gratis.',
      url: 'https://savvypos.com/',
      host: 'savvypos.com',
      img: 'clients/savvypos.webp',
    },
    faqs: [
      { q: '¿Puedo probarlo antes de pagar?', a: 'Sí. SavvyPOS tiene 30 días gratis, sin tarjeta de crédito.' },
      { q: '¿Hacen software a la medida desde cero?', a: 'Primero conocemos tu proceso. Si lo resolvemos con lo que ya tenemos, sale más rápido y económico; si no, te cotizamos el desarrollo.' },
      { q: '¿Funciona en el celular?', a: 'Sí. Funciona en el computador, la tablet o el celular que ya tienes.' },
    ],
    need: 'Software o sistema a la medida',
    waMessage: 'Hola, quiero cotizar un sistema / software para mi negocio con Savvytrix.',
  },
];
