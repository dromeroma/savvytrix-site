import { Component } from '@angular/core';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';
import { WHATSAPP_URL } from '../../../config';

interface Product {
  name: string;
  tagline: string;
  text: string;
  points: string[];
  status: 'disponible' | 'pronto';
  url?: string;
  host?: string;
  img?: string;
  wa?: string;
}

/** Aplicativos propios de Savvytrix que se venden por suscripción. Los "pronto" no prometen fecha. */
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SectionWrapperComponent],
  template: `
    <app-section-wrapper sectionId="desarrollos">
      <div class="text-center mb-12">
        <p class="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">Desarrollos propios</p>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text)] leading-tight text-balance">
          Aplicativos hechos por nosotros, listos para tu negocio.
        </h2>
        <p class="mt-4 text-[var(--color-text-muted)] max-w-2xl mx-auto text-balance">
          Software nuestro que mejoramos con lo que nos piden los clientes. Lo usas por una mensualidad, sin instalar nada.
        </p>
      </div>

      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
        <!-- Disponible -->
        @for (p of available; track p.name) {
          <a [href]="p.url" target="_blank" rel="noopener"
            class="group lg:col-span-3 flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-card-bg)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--color-accent)]">
            <div class="aspect-[16/10] overflow-hidden border-b border-[var(--color-border)]">
              <img [src]="p.img" [alt]="p.name" width="960" height="600" loading="lazy"
                class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]">
            </div>
            <div class="p-6 flex flex-col flex-1">
              <div class="flex items-center gap-3">
                <h3 class="text-2xl font-bold text-[var(--color-text)]">{{ p.name }}</h3>
                <span class="rounded-full bg-[var(--color-accent)] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">Disponible</span>
              </div>
              <p class="mt-1 text-sm font-semibold text-[var(--color-accent)]">{{ p.tagline }}</p>
              <p class="mt-3 text-[var(--color-text-muted)] leading-relaxed">{{ p.text }}</p>
              <ul class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                @for (pt of p.points; track pt) {
                  <li class="flex gap-2 text-sm text-[var(--color-text)]"><span class="text-[var(--color-accent)]">&#10003;</span>{{ pt }}</li>
                }
              </ul>
              <p class="mt-auto pt-5 font-semibold text-[var(--color-accent)]">Conocer {{ p.name }} en {{ p.host }} &rarr;</p>
            </div>
          </a>
        }

        <!-- Próximamente -->
        <div class="lg:col-span-2 grid grid-cols-1 gap-6">
          @for (p of upcoming; track p.name) {
            <div class="flex flex-col rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-card-bg)] p-6">
              <div class="flex items-center gap-3">
                <h3 class="text-xl font-bold text-[var(--color-text)]">{{ p.name }}</h3>
                <span class="rounded-full border border-[var(--color-accent)] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[var(--color-accent)]">Próximamente</span>
              </div>
              <p class="mt-1 text-sm font-semibold text-[var(--color-accent)]">{{ p.tagline }}</p>
              <p class="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed">{{ p.text }}</p>
              <ul class="mt-3 space-y-1.5">
                @for (pt of p.points; track pt) {
                  <li class="flex gap-2 text-sm text-[var(--color-text)]"><span class="text-[var(--color-accent)]">&#8226;</span>{{ pt }}</li>
                }
              </ul>
              <a [href]="p.wa" target="_blank" rel="noopener"
                class="mt-auto pt-5 text-sm font-semibold text-[var(--color-accent)] hover:underline">Quiero que me avisen cuando salga &rarr;</a>
            </div>
          }
        </div>
      </div>
    </app-section-wrapper>
  `,
})
export class ProductsComponent {
  private readonly products: Product[] = [
    {
      name: 'SavvyPOS',
      tagline: 'Punto de venta para tiendas y comercios',
      text: 'Vende, controla el inventario y lleva el fiado en un solo lugar. Funciona aunque se vaya el internet.',
      points: ['Ventas y caja', 'Inventario al día', 'Fiado con historial y saldo', 'Reportes del negocio', 'Computador, tablet o celular', '30 días gratis, sin tarjeta'],
      status: 'disponible',
      url: 'https://savvypos.com/',
      host: 'savvypos.com',
      img: 'clients/savvypos.webp',
    },
    {
      name: 'SavvyWISP',
      tagline: 'Administración para empresas de internet (ISP)',
      text: 'Para proveedores de internet que quieren tener su operación en orden, en un solo sistema.',
      points: ['Clientes, planes y contratos', 'Facturación mensual', 'Soporte y seguimiento de casos'],
      status: 'pronto',
      wa: `${WHATSAPP_URL}?text=${encodeURIComponent('Hola, tengo una empresa de internet y quiero saber cuándo sale SavvyWISP.')}`,
    },
    {
      name: 'SavvyPay',
      tagline: 'Cobros y pagos en línea',
      text: 'Para que tus clientes te paguen desde el celular, sin tener que ir a tu negocio.',
      points: ['Links de pago para compartir', 'Recaudo de facturas y cuotas', 'Pagos conectados a tu sitio'],
      status: 'pronto',
      wa: `${WHATSAPP_URL}?text=${encodeURIComponent('Hola, quiero saber cuándo sale SavvyPay para cobrar en línea.')}`,
    },
  ];

  readonly available = this.products.filter((p) => p.status === 'disponible');
  readonly upcoming = this.products.filter((p) => p.status === 'pronto');
}
