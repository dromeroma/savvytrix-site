import { Component, computed, inject, signal } from '@angular/core';
import { SavvyDataService } from '../../../services/savvy-data.service';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';

type Category = 'tiendas' | 'empresariales' | 'profesionales' | 'software';

interface ClientWork {
  name: string;
  category: Category;
  kind: string;
  text: string;
  url: string;
  host: string;
  img: string;
  /** false = aún sin permiso del cliente para mostrarlo (no aparece). */
  published?: boolean;
}

/** Proyectos reales en vivo: se manejan en el panel → Vitrina (solo con aval del cliente). La lista de
 *  abajo es el respaldo si el panel no responde. Sin cifras ni datos privados. */
@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [SectionWrapperComponent],
  templateUrl: './clients.component.html',
})
export class ClientsComponent {
  private readonly categories: { id: Category; label: string }[] = [
    { id: 'tiendas', label: 'Tiendas en línea' },
    { id: 'empresariales', label: 'Páginas empresariales' },
    { id: 'profesionales', label: 'Sitios profesionales' },
    { id: 'software', label: 'Software' },
  ];

  private readonly works: ClientWork[] = [
    {
      name: 'Yes Computo',
      category: 'tiendas',
      kind: 'Tecnología · Cartagena',
      text: 'Tienda en línea con catálogo, promociones y pedidos por WhatsApp.',
      url: 'https://yescomputo.com/',
      host: 'yescomputo.com',
      img: 'clients/yescomputo.webp',
    },
    {
      name: 'Gardennli',
      category: 'tiendas',
      kind: 'Tecnología, música y electrodomésticos · Cartagena',
      text: 'Catálogo por categorías con historias en video, como en Instagram.',
      url: 'https://gardennli.savvytrix.com/',
      host: 'gardennli.savvytrix.com',
      img: 'clients/gardennli.webp',
    },
    {
      name: 'Acabados La Troncal',
      category: 'tiendas',
      kind: 'Pisos y acabados · San Onofre',
      text: 'Catálogo de porcelanatos con calculadora de metros a cajas.',
      url: 'https://constructorsanonofre.com/',
      host: 'constructorsanonofre.com',
      img: 'clients/latroncal.webp',
    },
    {
      name: 'Lui Crochet',
      category: 'tiendas',
      kind: 'Artesanías tejidas a mano · Apartadó',
      text: 'Tienda artesanal con colecciones, piezas personalizables y pedidos por WhatsApp.',
      url: 'https://lui-crochet.savvytrix.com/',
      host: 'lui-crochet.savvytrix.com',
      img: 'clients/luicrochet.webp',
    },
    {
      name: 'Vivero Rehobot',
      category: 'tiendas',
      kind: 'Vivero · Apartadó',
      text: 'Catálogo de plantas, materas y abonos por categorías, con pedidos por WhatsApp.',
      url: 'https://viverorehobot.savvytrix.com/',
      host: 'viverorehobot.savvytrix.com',
      img: 'clients/viverorehobot.webp',
    },
    {
      name: 'Mary Cake & Dessert',
      category: 'tiendas',
      kind: 'Tortas personalizadas · Barranquilla',
      text: 'Tienda de tortas y postres con diseños por ocasión, inspiración y cotización por WhatsApp.',
      url: 'https://marycake.savvytrix.com/',
      host: 'marycake.savvytrix.com',
      img: 'clients/marycake.webp',
    },
    {
      name: 'Jolie Chevelure',
      category: 'tiendas',
      kind: 'Accesorios y cuidado del cabello · Cartagena',
      text: 'Tienda en línea con catálogo por categorías, medios de pago y pedidos por WhatsApp, en su propio dominio.',
      url: 'https://joliechevelure.com/',
      host: 'joliechevelure.com',
      img: 'clients/jolie.webp',
    },
    {
      name: 'SIR Telecomunicaciones',
      category: 'empresariales',
      kind: 'Internet por fibra óptica · Córdoba',
      text: 'Página empresarial con planes, test de velocidad, pago de factura y atención de PQR.',
      url: 'https://sirtel.com.co/',
      host: 'sirtel.com.co',
      img: 'clients/sirtel.webp',
    },
    {
      name: 'Fibratek',
      category: 'empresariales',
      kind: 'Internet por fibra óptica · San Pelayo',
      text: 'Página empresarial con planes, cobertura, test de velocidad y contacto directo.',
      url: 'https://fibratek.com.co/',
      host: 'fibratek.com.co',
      img: 'clients/fibratek.webp',
    },
    {
      name: 'Cliu',
      category: 'empresariales',
      kind: 'Lavandería industrial · Apartadó',
      text: 'Página empresarial con servicios, portal de clientes, vacantes y solicitud de servicio por WhatsApp.',
      url: 'https://cliu.com.co/',
      host: 'cliu.com.co',
      img: 'clients/cliu.webp',
    },
    {
      name: 'JEK Ingeniería',
      category: 'profesionales',
      kind: 'Ingeniería estructural · La Ceja',
      text: 'Sitio profesional con servicios, zonas de trabajo, guías y cotización en línea.',
      url: 'https://jekingenieria.com/',
      host: 'jekingenieria.com',
      img: 'clients/jek.webp',
    },
    {
      name: 'SavvyPOS',
      category: 'software',
      kind: 'Software propio · Punto de venta',
      text: 'Sistema de punto de venta para tiendas: ventas, inventario y fiado, aunque se vaya el internet.',
      url: 'https://savvypos.com/',
      host: 'savvypos.com',
      img: 'clients/savvypos.webp',
    },
  ];

  private readonly data = inject(SavvyDataService);

  private readonly visible = computed<ClientWork[]>(() => {
    const items = this.data.showcase()?.filter((i) => i.shot);
    if (items?.length) {
      return items.map((i) => ({ name: i.name, category: i.category, kind: i.kind, text: i.text, url: i.url, host: i.host, img: i.shot }));
    }
    return this.works.filter((w) => w.published !== false);
  });

  /** Solo las categorías que tienen al menos un proyecto publicado. */
  readonly tabs = computed(() => this.categories
    .map((c) => ({ ...c, count: this.visible().filter((w) => w.category === c.id).length }))
    .filter((c) => c.count > 0));

  readonly active = signal<Category | 'todos'>('todos');
  readonly total = computed(() => this.visible().length);
  readonly shown = computed(() => {
    const a = this.active();
    return a === 'todos' ? this.visible() : this.visible().filter((w) => w.category === a);
  });

  labelOf(c: Category): string {
    return this.categories.find((x) => x.id === c)?.label ?? '';
  }
}
