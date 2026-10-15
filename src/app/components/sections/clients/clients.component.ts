import { Component, computed, signal } from '@angular/core';
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

/** Proyectos reales en vivo. Agregar uno solo con permiso del cliente; sin cifras ni datos privados. */
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
      kind: 'Tienda general · Cartagena',
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
      kind: 'Artesanías tejidas a mano',
      text: 'Tienda artesanal con colecciones, piezas personalizables y pedidos por WhatsApp.',
      url: 'https://lui-crochet.savvytrix.com/',
      host: 'lui-crochet.savvytrix.com',
      img: 'clients/luicrochet.webp',
    },
    {
      name: 'Vivero Rehobot',
      category: 'tiendas',
      kind: 'Vivero · Mateguadua',
      text: 'Catálogo de plantas, materas y abonos por categorías, con pedidos por WhatsApp.',
      url: 'https://viverorehobot.savvytrix.com/',
      host: 'viverorehobot.savvytrix.com',
      img: 'clients/viverorehobot.webp',
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
      name: 'JEK Ingeniería',
      category: 'profesionales',
      kind: 'Ingeniería estructural · La Ceja',
      text: 'Sitio profesional con servicios, zonas de trabajo, guías y cotización en línea.',
      url: 'https://jekingenieria.com/',
      host: 'jekingenieria.com',
      img: 'clients/jek.webp',
      published: false, // esperando el aval del cliente
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

  private readonly visible = this.works.filter((w) => w.published !== false);

  /** Solo las categorías que tienen al menos un proyecto publicado. */
  readonly tabs = this.categories
    .map((c) => ({ ...c, count: this.visible.filter((w) => w.category === c.id).length }))
    .filter((c) => c.count > 0);

  readonly active = signal<Category | 'todos'>('todos');
  readonly total = this.visible.length;
  readonly shown = computed(() => {
    const a = this.active();
    return a === 'todos' ? this.visible : this.visible.filter((w) => w.category === a);
  });

  labelOf(c: Category): string {
    return this.categories.find((x) => x.id === c)?.label ?? '';
  }
}
