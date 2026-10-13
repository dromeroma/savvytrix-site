import { Component } from '@angular/core';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';
import { DELIVERABLES, ONBOARDING } from '../../../data/solutions';

/** Qué pasa después de contratar: pasos concretos + lo que el cliente tiene al terminar. */
@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [SectionWrapperComponent],
  template: `
    <app-section-wrapper sectionId="proceso">
      <div class="text-center mb-12">
        <p class="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">Después de contratar</p>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text)] leading-tight text-balance">
          Así arrancamos, paso a paso.
        </h2>
        <p class="mt-4 text-[var(--color-text-muted)] max-w-2xl mx-auto">
          Sabes qué va a pasar y qué vas a recibir desde el primer día.
        </p>
      </div>

      <div class="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
        <ol class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          @for (s of steps; track s.title; let i = $index) {
            <li class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-5">
              <span class="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-accent)]/15 text-sm font-bold text-[var(--color-accent)]">{{ i + 1 }}</span>
              <h3 class="mt-3 font-bold text-[var(--color-text)]">{{ s.title }}</h3>
              <p class="mt-1.5 text-sm text-[var(--color-text-muted)] leading-relaxed">{{ s.text }}</p>
            </li>
          }
        </ol>

        <div class="h-fit rounded-2xl border-2 border-[var(--color-accent)] bg-[var(--color-card-bg)] p-6 lg:sticky lg:top-28">
          <h3 class="text-lg font-bold text-[var(--color-text)]">Al terminar tienes</h3>
          <ul class="mt-4 space-y-3">
            @for (d of deliverables; track d) {
              <li class="flex items-start gap-2.5 text-[var(--color-text)]">
                <svg class="w-5 h-5 mt-0.5 shrink-0 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                <span>{{ d }}</span>
              </li>
            }
          </ul>
          <p class="mt-4 text-xs text-[var(--color-text-muted)]">Según lo que incluya tu cotización.</p>
          <p class="mt-5 rounded-xl bg-[var(--color-accent)]/10 px-4 py-3 text-sm text-[var(--color-text)]">
            <strong>Tiempo típico:</strong> 1 a 3 semanas para un sitio estándar; una tienda grande puede tomar más.
          </p>
          <a href="#cotizar" class="mt-5 flex items-center justify-center rounded-xl bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white hover:opacity-90">Quiero empezar</a>
        </div>
      </div>
    </app-section-wrapper>
  `,
})
export class OnboardingComponent {
  readonly steps = ONBOARDING;
  readonly deliverables = DELIVERABLES;
}
