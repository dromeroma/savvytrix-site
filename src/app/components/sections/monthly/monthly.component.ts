import { Component } from '@angular/core';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';
import { MONTHLY } from '../../../data/solutions';

/** Tranquilidad: qué recibe el cliente cada mes por su mensualidad. */
@Component({
  selector: 'app-monthly',
  standalone: true,
  imports: [SectionWrapperComponent],
  template: `
    <app-section-wrapper sectionId="tranquilidad" extraClass="py-20 lg:py-28 bg-[var(--color-bg-alt)]">
      <div class="text-center mb-12">
        <p class="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">Tranquilidad</p>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text)] leading-tight text-balance">
          Tú atiendes tu negocio. Nosotros cuidamos tu presencia en internet.
        </h2>
        <p class="mt-4 text-[var(--color-text-muted)] max-w-2xl mx-auto">
          Esto cubre tu mensualidad. Si quieres algo extra, como una campaña especial o una función nueva, te lo cotizamos aparte y sin sorpresas.
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        @for (m of items; track m.title) {
          <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6">
            <h3 class="font-bold text-[var(--color-text)]">{{ m.title }}</h3>
            <p class="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">{{ m.text }}</p>
          </div>
        }
      </div>
    </app-section-wrapper>
  `,
})
export class MonthlyComponent {
  readonly items = MONTHLY;
}
