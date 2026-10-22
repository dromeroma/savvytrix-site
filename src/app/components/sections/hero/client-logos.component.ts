import { Component } from '@angular/core';

interface ClientLogo {
  name: string;
  url: string;
  logo: string;
  /** Logos pensados para fondo oscuro: el chip toma ese color de fondo. */
  bg?: string;
}

/** Clientes reales en vivo (mismos de la sección Clientes). Al hacer clic se abre su sitio. */
const LOGOS: ClientLogo[] = [
  { name: 'Yes Computo', url: 'https://yescomputo.com/', logo: 'clients/logos/yescomputo.webp' },
  { name: 'Jolie Chevelure', url: 'https://joliechevelure.com/', logo: 'clients/logos/jolie.webp' },
  { name: 'SIR Telecomunicaciones', url: 'https://sirtel.com.co/', logo: 'clients/logos/sirtel.webp' },
  { name: 'Mary Cake & Dessert', url: 'https://marycake.savvytrix.com/', logo: 'clients/logos/marycake.webp' },
  { name: 'JEK Ingeniería', url: 'https://jekingenieria.com/', logo: 'clients/logos/jek.webp' },
  { name: 'Lui Crochet', url: 'https://lui-crochet.savvytrix.com/', logo: 'clients/logos/luicrochet.webp', bg: '#291c24' },
  { name: 'Acabados La Troncal', url: 'https://constructorsanonofre.com/', logo: 'clients/logos/latroncal.webp' },
  { name: 'Fibratek', url: 'https://fibratek.com.co/', logo: 'clients/logos/fibratek.webp' },
  { name: 'Vivero Rehobot', url: 'https://viverorehobot.savvytrix.com/', logo: 'clients/logos/viverorehobot.webp' },
  { name: 'Gardennli', url: 'https://gardennli.savvytrix.com/', logo: 'clients/logos/gardennli.webp' },
  { name: 'Cliu', url: 'https://cliu.com.co/', logo: 'clients/logos/cliu.webp', bg: '#202b3c' },
];

/** Cinta de logos de clientes que avanza de derecha a izquierda (se pausa al pasar el mouse). */
@Component({
  selector: 'app-client-logos',
  standalone: true,
  template: `
    <p class="text-center text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">
      Negocios que ya confían en nosotros
    </p>
    <div class="logos-mask overflow-hidden py-1" role="list" aria-label="Clientes de Savvytrix">
      <div class="logos-track flex w-max gap-4 sm:gap-5">
        @for (rep of [0, 1]; track rep) {
          @for (c of logos; track c.name) {
            <a [href]="c.url" target="_blank" rel="noopener" role="listitem"
              [attr.aria-hidden]="rep === 1 ? 'true' : null" [attr.tabindex]="rep === 1 ? -1 : null"
              [attr.aria-label]="c.name + ' — abrir su sitio'" [title]="c.name"
              class="logo-chip group flex h-14 sm:h-16 shrink-0 items-center justify-center rounded-2xl border border-black/5 px-5 sm:px-6 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md"
              [style.background]="c.bg || '#ffffff'">
              <img [src]="c.logo" [alt]="rep === 1 ? '' : c.name" decoding="async"
                class="w-auto max-w-[150px] sm:max-w-[170px] object-contain" [class]="c.bg ? 'h-10 sm:h-12' : 'h-8 sm:h-9'" />
            </a>
          }
        }
      </div>
    </div>
  `,
  styles: `
    .logos-mask {
      -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
      mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
    }
    .logos-track {
      animation: logos-scroll 45s linear infinite;
    }
    .logos-mask:hover .logos-track,
    .logos-mask:focus-within .logos-track {
      animation-play-state: paused;
    }
    /* La pista tiene dos copias seguidas: al llegar a la mitad vuelve al inicio sin salto. */
    @keyframes logos-scroll {
      from { transform: translateX(0); }
      to { transform: translateX(calc(-50% - 0.5rem)); }
    }
    @media (min-width: 640px) {
      @keyframes logos-scroll {
        from { transform: translateX(0); }
        to { transform: translateX(calc(-50% - 0.625rem)); }
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .logos-track { animation-duration: 120s; }
    }
  `,
})
export class ClientLogosComponent {
  readonly logos = LOGOS;
}
