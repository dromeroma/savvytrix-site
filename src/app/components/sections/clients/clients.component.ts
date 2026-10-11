import { Component } from '@angular/core';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';

/** Clientes reales en vivo hechos con Savvy Sites. Agregar uno solo con su permiso. */
@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [SectionWrapperComponent],
  templateUrl: './clients.component.html',
})
export class ClientsComponent {
  readonly clients = [
    {
      name: 'Yes Computo',
      kind: 'Tecnología · Cartagena',
      text: 'Tienda en línea con catálogo, promociones y pedidos por WhatsApp.',
      url: 'https://yescomputo.com/',
      host: 'yescomputo.com',
      img: 'clients/yescomputo.webp',
    },
    {
      name: 'Gardennli',
      kind: 'Tienda general · Cartagena',
      text: 'Catálogo por categorías con historias en video, como en Instagram.',
      url: 'https://gardennli.savvytrix.com/',
      host: 'gardennli.savvytrix.com',
      img: 'clients/gardennli.webp',
    },
    {
      name: 'Acabados La Troncal',
      kind: 'Pisos y acabados · San Onofre',
      text: 'Catálogo de porcelanatos con calculadora de metros a cajas.',
      url: 'https://constructorsanonofre.com/',
      host: 'constructorsanonofre.com',
      img: 'clients/latroncal.webp',
    },
  ];
}
