import { Component, computed, inject } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { ButtonComponent } from '../../ui/button/button.component';
import { ClientLogosComponent } from './client-logos.component';
import { SavvyDataService } from '../../../services/savvy-data.service';
import { CtaService } from '../../../services/cta.service';

/** Respaldo si el panel no responde (se edita en el panel → Portada). */
const HERO = {
  titleTop: 'Más clientes, más ventas',
  titleMain: 'y tu negocio en orden.',
  subtitle: 'Para tiendas, ferreterías, profesionales y comercios en Colombia: te ponemos en Google, te armamos tu tienda en línea y te damos el sistema para vender y controlar tu negocio.',
  ctaLabel: 'Cotizar mi proyecto',
};

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent, ClientLogosComponent],
  templateUrl: './hero.component.html',
  animations: [
    trigger('heroEnter', [
      transition(':enter', [
        query('.hero-anim', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(120, [
            animate('800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ],
})
export class HeroComponent {
  private readonly data = inject(SavvyDataService);
  readonly cta = inject(CtaService);
  readonly hero = computed(() => {
    const h = this.data.hero();
    return {
      titleTop: h?.titleTop || HERO.titleTop,
      titleMain: h?.titleMain || HERO.titleMain,
      subtitle: h?.subtitle || HERO.subtitle,
      ctaLabel: h?.ctaLabel || HERO.ctaLabel,
    };
  });
}
