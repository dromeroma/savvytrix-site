import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';
import { NICHES } from '../../../data/solutions';

/** Soluciones por tipo de negocio → /soluciones/<slug>. */
@Component({
  selector: 'app-niches',
  standalone: true,
  imports: [SectionWrapperComponent, RouterLink],
  template: `
    <app-section-wrapper sectionId="negocios">
      <div class="text-center mb-12">
        <p class="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">Para tu tipo de negocio</p>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text)] leading-tight text-balance">
          Soluciones pensadas para lo que vendes.
        </h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        @for (n of niches; track n.slug) {
          <a [routerLink]="['/soluciones', n.slug]"
            class="group flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6 transition-all hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-lg">
            <h3 class="text-lg font-bold text-[var(--color-text)]">{{ n.name }}</h3>
            <p class="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">{{ n.short }}</p>
            <p class="mt-auto pt-4 text-sm font-semibold text-[var(--color-accent)]">Ver la solución &rarr;</p>
          </a>
        }
      </div>
    </app-section-wrapper>
  `,
})
export class NichesComponent {
  /** Orden de presentación: tiendas primero, luego empresas y software. */
  private static readonly ORDER = [
    'tiendas-de-tecnologia', 'electrodomesticos-y-sonido', 'ferreterias-y-materiales',
    'viveros-y-jardineria', 'artesanias-y-hecho-a-mano', 'comercios-y-tiendas',
    'profesionales-y-servicios', 'empresas-de-internet', 'software-para-negocios',
  ];
  readonly niches = [...NICHES].sort((a, b) => {
    const i = (s: string) => { const k = NichesComponent.ORDER.indexOf(s); return k < 0 ? 99 : k; };
    return i(a.slug) - i(b.slug);
  });
}
