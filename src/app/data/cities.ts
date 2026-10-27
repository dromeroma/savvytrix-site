/**
 * Páginas por ciudad o región (/diseno-web/<slug>) para aparecer en búsquedas locales de Google.
 * REGLAS: no hay oficina física (no se inventan direcciones); "presencial" solo donde el dueño de
 * verdad se reúne con clientes (con cita, normalmente en centros comerciales); los casos son
 * clientes reales de esa región (nombres de CaseStudy en solutions.ts), sin datos ni cifras.
 * Cada página tiene texto propio: Google castiga las páginas iguales que solo cambian el nombre.
 */

export interface City {
  slug: string;
  name: string;        // como se busca: "Montería", "el Eje Cafetero"
  short: string;       // para chips y enlaces
  region: string;      // departamento(s)
  seoTitle: string;
  seoDescription: string;
  headline: string;
  intro: string;
  local: string;       // párrafo propio sobre los negocios de la zona
  attention: 'presencial' | 'virtual';
  attentionText: string;
  nearby: string[];    // municipios cercanos que también atendemos
  sectors: string[];   // slugs de NICHES que más aplican
  cases: string[];     // clientes de la región (CaseStudy.client)
  casesPlace?: string; // cómo nombrar la zona de esos clientes (por defecto: region)
  faqs: { q: string; a: string }[];
  waMessage: string;
}

export const CITIES: City[] = [
  {
    slug: 'cartagena',
    name: 'Cartagena',
    short: 'Cartagena',
    region: 'Bolívar',
    seoTitle: 'Diseño de páginas web en Cartagena | Savvytrix Solutions',
    seoDescription: 'Páginas web, tiendas en línea con pedidos por WhatsApp y sistemas de venta para negocios en Cartagena. Atención con cita y clientes reales en la ciudad.',
    headline: 'Páginas web y tiendas en línea para negocios en Cartagena',
    intro: 'Creamos el sitio de tu negocio para que te encuentren en Google y te escriban por WhatsApp, con un panel para que lo actualices tú mismo.',
    local: 'Cartagena se mueve con el comercio, el turismo, la construcción y miles de emprendimientos que venden por Instagram y WhatsApp. Ahí es donde un sitio propio marca la diferencia: tu catálogo siempre disponible, tus precios claros y un enlace que puedes compartir en todas partes. Varias tiendas de la ciudad ya venden así con nosotros.',
    attention: 'presencial',
    attentionText: 'Nos reunimos contigo en Cartagena con cita previa, normalmente en un centro comercial cerca de ti, y el resto lo hacemos por WhatsApp y videollamada.',
    nearby: ['Turbaco', 'Arjona', 'Santa Rosa', 'Bocagrande', 'Manga', 'Mamonal'],
    sectors: ['tiendas-de-tecnologia', 'electrodomesticos-y-sonido', 'belleza-y-accesorios', 'comercios-y-tiendas'],
    cases: ['Yes Computo', 'Gardennli', 'Jolie Chevelure'],
    casesPlace: 'Cartagena',
    faqs: [
      { q: '¿Tienen oficina en Cartagena?', a: 'No tenemos local abierto al público: atendemos con cita previa. Nos reunimos donde te quede cómodo, normalmente en un centro comercial, y el seguimiento lo hacemos por WhatsApp.' },
      { q: '¿Cuánto se demora mi página web?', a: 'Un sitio sencillo queda listo en pocos días hábiles después de recibir tu logo, fotos y datos. Una tienda con muchos productos toma un poco más según el catálogo.' },
      { q: '¿Me ayudan a aparecer en Google Maps en Cartagena?', a: 'Sí. Configuramos o mejoramos tu Perfil de Empresa en Google, lo conectamos con tu sitio y te explicamos cómo conseguir reseñas de tus clientes.' },
      { q: '¿Puedo actualizar los productos yo mismo?', a: 'Sí. Te entregamos un panel fácil para cambiar productos, precios, fotos y promociones desde el celular o el computador.' },
    ],
    waMessage: 'Hola, estoy en Cartagena y quiero una página web para mi negocio.',
  },
  {
    slug: 'monteria',
    name: 'Montería',
    short: 'Montería',
    region: 'Córdoba',
    seoTitle: 'Páginas web en Montería y Córdoba | Savvytrix Solutions',
    seoDescription: 'Diseño de páginas web, tiendas en línea y sistemas de venta para negocios en Montería y Córdoba. Atención con cita y clientes reales en el departamento.',
    headline: 'Páginas web para negocios de Montería y todo Córdoba',
    intro: 'Tu negocio en internet, listo para que te encuentren en Google y te pidan por WhatsApp, con alguien cerca que te responde.',
    local: 'En Montería y el resto de Córdoba el comercio, el agro y los servicios crecen rápido, y cada vez más clientes buscan en Google antes de comprar o contratar. Ya acompañamos a empresas cordobesas, como proveedores de internet de la región, con sitios donde sus clientes consultan planes y se comunican directo con ellos.',
    attention: 'presencial',
    attentionText: 'Viajamos a Montería con frecuencia y nos reunimos contigo con cita previa, normalmente en un centro comercial. Entre visitas te atendemos por WhatsApp y videollamada.',
    nearby: ['Cereté', 'Lorica', 'Sahagún', 'San Pelayo', 'Planeta Rica', 'Tierralta'],
    sectors: ['empresas-de-internet', 'comercios-y-tiendas', 'ferreterias-y-materiales', 'profesionales-y-servicios'],
    cases: ['SIR Telecomunicaciones', 'Fibratek'],
    faqs: [
      { q: '¿Atienden en persona en Montería?', a: 'Sí, con cita previa. Coordinamos un encuentro en un centro comercial o donde te quede cómodo, y el resto del proceso lo hacemos por WhatsApp.' },
      { q: '¿También trabajan con negocios fuera de Montería?', a: 'Sí. Atendemos todo Córdoba: Cereté, Lorica, Sahagún, San Pelayo y más. Buena parte del trabajo se hace a distancia, así que el municipio no es problema.' },
      { q: '¿Sirve una tienda en línea para un negocio pequeño?', a: 'Sí. Tus clientes ven el catálogo, arman el pedido y te llega por WhatsApp, sin comisiones por venta. Es la forma más simple de vender por internet.' },
      { q: '¿Qué necesito para empezar?', a: 'Tu logo (si no tienes, lo hacemos), fotos de tus productos o trabajos y los datos de contacto. Con eso armamos una primera versión para que la revises.' },
    ],
    waMessage: 'Hola, estoy en Montería y quiero una página web para mi negocio.',
  },
  {
    slug: 'medellin',
    name: 'Medellín',
    short: 'Medellín',
    region: 'Antioquia',
    seoTitle: 'Diseño de páginas web en Medellín y Antioquia | Savvytrix Solutions',
    seoDescription: 'Páginas web profesionales, tiendas en línea y sistemas de venta para negocios en Medellín, el Valle de Aburrá y el Oriente antioqueño. Atención con cita.',
    headline: 'Páginas web en Medellín para negocios que quieren más clientes',
    intro: 'Sitios rápidos, pensados para el celular y para Google, con formulario de cotización y WhatsApp en todas las páginas.',
    local: 'Medellín y el Valle de Aburrá tienen una competencia digital fuerte: profesionales, comercios y empresas de servicios que ya invierten en internet. Para destacar no basta con "tener página": hay que aparecer cuando te buscan y convertir la visita en cotización. Así trabajamos con empresas antioqueñas como JEK Ingeniería, en el Oriente.',
    attention: 'presencial',
    attentionText: 'Nos reunimos contigo en Medellín con cita previa, normalmente en un centro comercial, y el seguimiento lo hacemos por WhatsApp y videollamada.',
    nearby: ['Envigado', 'Itagüí', 'Bello', 'Sabaneta', 'Rionegro', 'La Ceja'],
    sectors: ['profesionales-y-servicios', 'comercios-y-tiendas', 'belleza-y-accesorios', 'software-para-negocios'],
    cases: ['JEK Ingeniería'],
    faqs: [
      { q: '¿Atienden en el Oriente antioqueño?', a: 'Sí. Trabajamos con negocios de Rionegro, La Ceja y el resto del Oriente, además del Valle de Aburrá.' },
      { q: '¿Mi página tendrá formulario de cotización?', a: 'Sí. Las solicitudes llegan a tu correo y celular, y el botón de WhatsApp está en todas las páginas para que el cliente te escriba cuando quiera.' },
      { q: '¿Pueden mostrar las reseñas de Google en mi sitio?', a: 'Sí. Conectamos tu Perfil de Empresa y tus mejores reseñas aparecen en el sitio y se actualizan solas.' },
      { q: '¿Cómo es el pago?', a: 'Un valor de creación y una mensualidad que cubre alojamiento, cambios, soporte e informe mensual. Te enviamos la cotización por WhatsApp sin compromiso.' },
    ],
    waMessage: 'Hola, estoy en Medellín y quiero una página web para mi negocio.',
  },
  {
    slug: 'bogota',
    name: 'Bogotá',
    short: 'Bogotá',
    region: 'Cundinamarca',
    seoTitle: 'Páginas web para negocios en Bogotá | Savvytrix Solutions',
    seoDescription: 'Diseño de páginas web, tiendas en línea con pedidos por WhatsApp y sistema POS para negocios en Bogotá. Atención con cita y soporte directo.',
    headline: 'Páginas web y tiendas en línea para negocios en Bogotá',
    intro: 'Tecnología propia, precio justo y soporte directo con quien construye tu sitio: sin intermediarios ni tiquetes que nadie responde.',
    local: 'En Bogotá compites con miles de negocios en cada búsqueda. Por eso cada sitio que hacemos sale optimizado para Google desde el primer día, carga rápido en el celular y lleva al cliente directo a WhatsApp o al formulario. Si vendes productos, tu tienda en línea recibe pedidos sin pagar comisiones a plataformas.',
    attention: 'presencial',
    attentionText: 'Cuando estamos en Bogotá nos reunimos contigo con cita previa, normalmente en un centro comercial. El proceso completo también funciona por videollamada y WhatsApp.',
    nearby: ['Chía', 'Soacha', 'Mosquera', 'Funza', 'Zipaquirá', 'Cajicá'],
    sectors: ['comercios-y-tiendas', 'profesionales-y-servicios', 'tiendas-de-tecnologia', 'software-para-negocios'],
    cases: [],
    faqs: [
      { q: '¿Tienen clientes en Bogotá?', a: 'Hoy nuestros clientes están sobre todo en la Costa y Antioquia, y abajo puedes ver sus sitios reales. En Bogotá atendemos con cita previa y por videollamada, con el mismo soporte directo.' },
      { q: '¿Por qué no contratar una agencia grande?', a: 'Porque con nosotros hablas con quien construye tu sitio. Usamos tecnología propia, así que los cambios son rápidos y el precio no incluye capas de intermediarios.' },
      { q: '¿El sitio aparecerá en Google?', a: 'Sí. Lo dejamos con títulos, descripciones, mapa del sitio y datos estructurados, y lo conectamos con tu Perfil de Empresa en Google.' },
      { q: '¿Puedo vender sin pagar comisiones?', a: 'Sí. Tu tienda recibe pedidos por WhatsApp y tú cobras directo a tu cliente, sin comisiones por venta.' },
    ],
    waMessage: 'Hola, estoy en Bogotá y quiero una página web para mi negocio.',
  },
  {
    slug: 'cali',
    name: 'Cali',
    short: 'Cali',
    region: 'Valle del Cauca',
    seoTitle: 'Diseño de páginas web en Cali | Savvytrix Solutions',
    seoDescription: 'Páginas web, tiendas en línea y sistemas de venta para negocios en Cali y el Valle del Cauca. Atención con cita, videollamada y soporte por WhatsApp.',
    headline: 'Páginas web en Cali para vender más por internet',
    intro: 'Tu catálogo, tus servicios y tu WhatsApp en un sitio profesional que tus clientes encuentran en Google.',
    local: 'Cali tiene un comercio muy activo, con restaurantes, belleza, moda y servicios que viven de que los recomienden y los encuentren rápido. Un sitio propio, con tus fotos, tus precios y tus reseñas de Google, convierte esas búsquedas en mensajes de WhatsApp listos para comprar.',
    attention: 'presencial',
    attentionText: 'Cuando estamos en Cali nos reunimos contigo con cita previa, normalmente en un centro comercial. Todo el proceso también se puede hacer por videollamada y WhatsApp.',
    nearby: ['Palmira', 'Jamundí', 'Yumbo', 'Candelaria', 'Tuluá', 'Buga'],
    sectors: ['belleza-y-accesorios', 'pastelerias-y-reposteria', 'comercios-y-tiendas', 'profesionales-y-servicios'],
    cases: [],
    faqs: [
      { q: '¿Tienen clientes en Cali?', a: 'Nuestros clientes actuales están sobre todo en la Costa y Antioquia, y puedes ver sus sitios abajo. En Cali atendemos con cita previa y por videollamada, con el mismo soporte.' },
      { q: '¿Sirve para un restaurante o un negocio de belleza?', a: 'Sí. Mostramos tu carta o tus servicios con fotos, horarios y ubicación, y el cliente reserva o pide por WhatsApp.' },
      { q: '¿Cuánto cuesta?', a: 'Depende de lo que necesites. Tenemos planes con precio desde y opciones a la medida; te enviamos la cotización por WhatsApp sin compromiso.' },
      { q: '¿Me ayudan con Google Maps?', a: 'Sí. Configuramos tu Perfil de Empresa, lo conectamos con tu sitio y te enseñamos a pedir reseñas a tus clientes.' },
    ],
    waMessage: 'Hola, estoy en Cali y quiero una página web para mi negocio.',
  },
  {
    slug: 'barranquilla',
    name: 'Barranquilla',
    short: 'Barranquilla',
    region: 'Atlántico',
    seoTitle: 'Páginas web en Barranquilla | Savvytrix Solutions',
    seoDescription: 'Diseño de páginas web y tiendas en línea con pedidos por WhatsApp para negocios en Barranquilla y el Atlántico. Clientes reales en la ciudad.',
    headline: 'Páginas web y tiendas en línea para negocios en Barranquilla',
    intro: 'Un sitio que trabaja por ti: muestra lo que vendes, responde lo básico y te manda los pedidos por WhatsApp.',
    local: 'Barranquilla es comercio, gastronomía y emprendimiento: negocios que venden mucho por redes y necesitan un lugar propio donde mostrar todo su catálogo. Un ejemplo es Mary Cake & Dessert, una pastelería de la ciudad que recibe sus pedidos de tortas personalizadas desde su sitio.',
    attention: 'virtual',
    attentionText: 'En Barranquilla te atendemos por videollamada y WhatsApp, y coordinamos reuniones en persona con cita según la agenda de viaje.',
    nearby: ['Soledad', 'Puerto Colombia', 'Malambo', 'Galapa', 'Sabanalarga'],
    sectors: ['pastelerias-y-reposteria', 'comercios-y-tiendas', 'belleza-y-accesorios', 'tiendas-de-tecnologia'],
    cases: ['Mary Cake & Dessert'],
    casesPlace: 'Barranquilla',
    faqs: [
      { q: '¿Se puede hacer todo sin reunirnos?', a: 'Sí. La mayoría de nuestros clientes hacen el proceso completo por WhatsApp y videollamada: nos envías la información, revisas la propuesta y la publicamos.' },
      { q: '¿Sirve para recibir pedidos personalizados?', a: 'Sí. Como en el caso de Mary Cake, el cliente elige, cuenta lo que quiere y el pedido te llega organizado por WhatsApp.' },
      { q: '¿Puedo poner promociones de temporada?', a: 'Sí. Desde tu panel activas promociones y campañas (Día de la Madre, Navidad, Carnaval) sin depender de nadie.' },
      { q: '¿Me ayudan a aparecer en Google en Barranquilla?', a: 'Sí. Dejamos el sitio optimizado y conectado con tu Perfil de Empresa en Google y Google Maps.' },
    ],
    waMessage: 'Hola, estoy en Barranquilla y quiero una página web para mi negocio.',
  },
  {
    slug: 'eje-cafetero',
    name: 'el Eje Cafetero',
    short: 'Eje Cafetero',
    region: 'Risaralda, Caldas y Quindío',
    seoTitle: 'Páginas web en Pereira, Manizales y Armenia | Savvytrix Solutions',
    seoDescription: 'Diseño de páginas web, tiendas en línea y sistemas de venta para negocios del Eje Cafetero: Pereira, Manizales y Armenia. Atención por videollamada.',
    headline: 'Páginas web para negocios de Pereira, Manizales y Armenia',
    intro: 'Te encuentran en Google, ven lo que ofreces y te escriben por WhatsApp. Todo desde un sitio que tú mismo actualizas.',
    local: 'El Eje Cafetero combina comercio, turismo y café de origen: negocios que reciben clientes de todo el país y de afuera, y que necesitan verse profesionales en internet. Hoteles, fincas, tiendas y profesionales ganan mucho con un sitio claro, bien ubicado en Google y con pedidos o reservas por WhatsApp.',
    attention: 'virtual',
    attentionText: 'En el Eje Cafetero te atendemos por videollamada y WhatsApp, con el mismo soporte directo que en el resto del país.',
    nearby: ['Pereira', 'Dosquebradas', 'Manizales', 'Armenia', 'Santa Rosa de Cabal', 'Calarcá'],
    sectors: ['comercios-y-tiendas', 'profesionales-y-servicios', 'artesanias-y-hecho-a-mano', 'software-para-negocios'],
    cases: [],
    faqs: [
      { q: '¿Trabajan con negocios del Eje Cafetero?', a: 'Sí, de forma virtual. Nuestros clientes actuales están en la Costa y Antioquia (abajo ves sus sitios), y el proceso por videollamada y WhatsApp funciona igual de bien.' },
      { q: '¿Sirve para turismo, fincas u hoteles?', a: 'Sí. Mostramos tus espacios con fotos, servicios y ubicación, y el cliente reserva o pregunta por WhatsApp.' },
      { q: '¿Pueden vender mi café o productos de la región?', a: 'Sí. Una tienda en línea con catálogo, carrito y pedidos por WhatsApp, lista para compartir en redes.' },
      { q: '¿Qué pasa si necesito cambios después?', a: 'Tú mismo cambias lo básico desde tu panel, y la mensualidad incluye cambios y soporte directo por WhatsApp.' },
    ],
    waMessage: 'Hola, estoy en el Eje Cafetero y quiero una página web para mi negocio.',
  },
  {
    slug: 'uraba',
    name: 'Urabá',
    short: 'Urabá · Apartadó',
    region: 'Antioquia',
    seoTitle: 'Páginas web en Apartadó y Urabá | Savvytrix Solutions',
    seoDescription: 'Páginas web y tiendas en línea para negocios de Apartadó, Carepa, Chigorodó y Turbo. Atención con cita y clientes reales en Urabá.',
    headline: 'Páginas web para negocios de Apartadó y todo Urabá',
    intro: 'Tu negocio visible en Google y con pedidos por WhatsApp, con alguien que conoce la región y te responde directo.',
    local: 'Urabá crece con el comercio, el agro y emprendimientos que antes solo vendían en persona o por redes. Ya hay negocios de Apartadó vendiendo con su propio sitio, como Vivero Rehobot con su catálogo de plantas y Lui Crochet con sus piezas hechas a mano.',
    attention: 'presencial',
    attentionText: 'Nos reunimos contigo en Apartadó con cita previa y te acompañamos por WhatsApp durante todo el proceso.',
    nearby: ['Apartadó', 'Carepa', 'Chigorodó', 'Turbo', 'Necoclí'],
    sectors: ['viveros-y-jardineria', 'artesanias-y-hecho-a-mano', 'comercios-y-tiendas', 'ferreterias-y-materiales'],
    cases: ['Vivero Rehobot', 'Lui Crochet'],
    casesPlace: 'Urabá',
    faqs: [
      { q: '¿Atienden en Apartadó?', a: 'Sí, con cita previa, y también Carepa, Chigorodó, Turbo y el resto de Urabá. El seguimiento lo hacemos por WhatsApp.' },
      { q: '¿Sirve para un emprendimiento pequeño?', a: 'Sí. Tu catálogo en línea con pedidos por WhatsApp es la forma más sencilla de vender más allá de tu barrio, sin pagar comisiones.' },
      { q: '¿Necesito saber de tecnología?', a: 'No. Te entregamos el sitio listo y un panel fácil para cambiar fotos y precios. Si algo se complica, nos escribes.' },
      { q: '¿Me ayudan a aparecer en Google Maps?', a: 'Sí. Configuramos tu Perfil de Empresa y lo conectamos con tu sitio para que te encuentren en la región.' },
    ],
    waMessage: 'Hola, estoy en Urabá y quiero una página web para mi negocio.',
  },
];
