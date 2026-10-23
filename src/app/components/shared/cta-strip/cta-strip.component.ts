import { Component, computed, inject, input } from '@angular/core';
import { CtaService, wa } from '../../../services/cta.service';
import { SavvyDataService } from '../../../services/savvy-data.service';

/** Llamado a la acción entre secciones: una frase y los dos caminos (cotizar o WhatsApp). */
@Component({
  selector: 'app-cta-strip',
  standalone: true,
  template: `
    <div class="px-4 sm:px-6 lg:px-8 py-10">
      <div class="mx-auto flex max-w-5xl flex-col items-center gap-5 rounded-3xl border border-[var(--color-accent)]/25 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent px-6 py-8 text-center sm:px-10 lg:flex-row lg:justify-between lg:text-left">
        <div>
          <p class="text-xl font-bold leading-snug text-[var(--color-text)] sm:text-2xl text-balance">{{ title() }}</p>
          @if (text()) { <p class="mt-1.5 text-[var(--color-text-muted)]">{{ text() }}</p> }
        </div>
        <div class="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
          <a href="/#cotizar" (click)="go($event)"
            class="inline-flex items-center justify-center rounded-xl bg-[var(--color-accent)] px-6 py-3.5 font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,201,167,0.3)] active:scale-[0.97]">
            {{ cta() }}
          </a>
          <a [href]="waUrl()" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[var(--color-border)] px-6 py-3 font-semibold text-[var(--color-text)] transition-all hover:border-[#25D366] active:scale-[0.97]">
            <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="#25D366"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88M20.46 3.49A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41z"/></svg>
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </div>
  `,
})
export class CtaStripComponent {
  private readonly ctaService = inject(CtaService);
  private readonly data = inject(SavvyDataService);
  readonly title = input.required<string>();
  readonly text = input('');
  readonly cta = input('Cotizar mi proyecto');
  /** Mensaje de WhatsApp propio de este llamado (si no, el de la página). */
  readonly waMessage = input('');
  readonly waUrl = computed(() => (this.waMessage() ? wa(this.waMessage(), this.data.whatsappNumber()) : this.ctaService.waUrl()));

  go(ev: Event): void {
    if (document.getElementById('cotizar')) {
      ev.preventDefault();
      this.ctaService.goToForm();
    }
  }
}
