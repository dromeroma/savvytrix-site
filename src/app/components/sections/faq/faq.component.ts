import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';
import { HOME_FAQS } from '../../../data/solutions';

/** Objeciones típicas antes de comprar (costo, tiempo, qué entregar, si dejo de pagar…). */
@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [SectionWrapperComponent],
  template: `
    <app-section-wrapper sectionId="preguntas" extraClass="py-20 lg:py-28 bg-[var(--color-bg-alt)]">
      <div class="text-center mb-10">
        <p class="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">Preguntas frecuentes</p>
        <h2 class="text-3xl sm:text-4xl font-bold text-[var(--color-text)] leading-tight text-balance">Lo que nos preguntan antes de empezar.</h2>
      </div>
      <div class="mx-auto max-w-3xl space-y-3">
        @for (f of faqs; track f.q) {
          <details class="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-5">
            <summary class="flex cursor-pointer list-none justify-between gap-4 font-semibold text-[var(--color-text)]">
              {{ f.q }}<span class="text-xl leading-none text-[var(--color-accent)] transition-transform group-open:rotate-45">+</span>
            </summary>
            <p class="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{{ f.a }}</p>
          </details>
        }
      </div>
    </app-section-wrapper>
  `,
})
export class FaqComponent {
  readonly faqs = HOME_FAQS;

  constructor() {
    // Datos estructurados para resultados enriquecidos en Google.
    const doc = inject(DOCUMENT);
    if (doc.getElementById('faq-ld')) return;
    const ld = doc.createElement('script');
    ld.id = 'faq-ld';
    ld.type = 'application/ld+json';
    ld.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    }).replace(/</g, '\\u003c');
    doc.head.appendChild(ld);
  }
}
