import { Component, computed, inject } from '@angular/core';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';
import { SavvyDataService } from '../../../services/savvy-data.service';
import { GOOGLE_MAPS_URL, GOOGLE_REVIEW_URL } from '../../../config';


/**
 * Reseñas de Google (panel → Reseñas, cliente interno savvytrix). Con reseñas: calificación real y
 * tarjetas (solo 4–5 ★). Sin reseñas todavía: invitación a dejar la primera (nunca estrellas inventadas).
 * Siempre con "Califícanos en Google" y el enlace a la ficha en Maps.
 */
@Component({
  selector: 'app-google-reviews',
  standalone: true,
  imports: [SectionWrapperComponent],
  template: `
    <app-section-wrapper sectionId="resenas" extraClass="py-16 lg:py-20">
      @if (data.reviews(); as r) {
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div class="lg:col-span-4">
            <p class="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">Reseñas en Google</p>
            <h2 class="text-3xl sm:text-4xl font-bold text-[var(--color-text)] leading-tight text-balance">Lo que dicen nuestros clientes</h2>
            <div class="mt-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6">
              <div class="flex items-center gap-2 font-semibold text-[var(--color-text)]"><svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true"><path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.8-.4-4.1H24v7.6h12.1c-.2 2-1.6 5-4.6 7l7.1 5.5c4.2-3.9 6.5-9.6 6.5-16z"/><path fill="#34A853" d="M24 46c6 0 11-2 14.6-5.4l-7.1-5.5c-1.9 1.3-4.4 2.2-7.5 2.2-5.8 0-10.6-3.8-12.4-9.1l-7.3 5.7C7.9 41 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.6 28.2c-.5-1.3-.7-2.7-.7-4.2s.3-2.9.7-4.2l-7.3-5.7C2.8 17.1 2 20.5 2 24s.8 6.9 2.3 9.9l7.3-5.7z"/><path fill="#EA4335" d="M24 10.7c4.1 0 6.9 1.8 8.5 3.3l6.2-6.1C35 4.5 30 2 24 2 15.4 2 7.9 7 4.3 14.1l7.3 5.7c1.8-5.3 6.6-9.1 12.4-9.1z"/></svg> Google</div>
              @if (r.rating) {
                <div class="mt-4 flex items-end gap-3">
                  <span class="text-5xl font-bold leading-none text-[var(--color-text)]">{{ fmt(r.rating) }}</span>
                  <span class="mb-1 flex gap-0.5 text-[#fbbc04]">@for (s of five; track s) { <svg width="18" height="18" viewBox="0 0 24 24" [attr.fill]="s <= round(r.rating) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path [attr.d]="star"/></svg> }</span>
                </div>
                <p class="mt-2 text-sm text-[var(--color-text-muted)]">Basado en {{ r.count }} {{ r.count === 1 ? 'reseña' : 'reseñas' }} de clientes en Google.</p>
              }
              <div class="mt-5 flex flex-col gap-2.5">
                <a [href]="reviewUrl" target="_blank" rel="noopener" class="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5">★ Califícanos en Google</a>
                <a [href]="mapsUrl()" target="_blank" rel="noopener" class="text-center text-sm font-semibold text-[var(--color-accent)] hover:underline">Ver todas en Google →</a>
              </div>
            </div>
          </div>
          <div class="lg:col-span-8">
            <div class="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0">
              @for (it of r.items.slice(0, 6); track $index) {
                <figure class="flex w-[85%] shrink-0 snap-start flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6 sm:w-auto">
                  <span class="flex gap-0.5 text-[#fbbc04]">@for (s of five; track s) { @if (s <= it.rating) { <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path [attr.d]="star"/></svg> } }</span>
                  <blockquote class="mt-3 line-clamp-6 flex-1 text-[var(--color-text-muted)] leading-relaxed">“{{ it.text }}”</blockquote>
                  <figcaption class="mt-4 flex items-center gap-3 border-t border-[var(--color-border)] pt-4">
                    @if (it.photo) {
                      <img [src]="it.photo" [alt]="it.author" width="36" height="36" loading="lazy" referrerpolicy="no-referrer" class="h-9 w-9 shrink-0 rounded-full object-cover" />
                    } @else {
                      <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--color-primary)] font-bold text-white">{{ it.author.charAt(0) }}</span>
                    }
                    <span class="min-w-0 text-sm font-semibold text-[var(--color-text)]"><span class="block truncate">{{ it.author }}</span><span class="block text-xs font-normal text-[var(--color-text-muted)]">Reseña en Google</span></span>
                  </figcaption>
                </figure>
              }
            </div>
          </div>
        </div>
      } @else {
        <div class="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-8 text-center sm:p-10 md:flex-row md:text-left">
          <span class="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-[var(--color-border)] bg-white"><svg width="34" height="34" viewBox="0 0 48 48" aria-hidden="true"><path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.8-.4-4.1H24v7.6h12.1c-.2 2-1.6 5-4.6 7l7.1 5.5c4.2-3.9 6.5-9.6 6.5-16z"/><path fill="#34A853" d="M24 46c6 0 11-2 14.6-5.4l-7.1-5.5c-1.9 1.3-4.4 2.2-7.5 2.2-5.8 0-10.6-3.8-12.4-9.1l-7.3 5.7C7.9 41 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.6 28.2c-.5-1.3-.7-2.7-.7-4.2s.3-2.9.7-4.2l-7.3-5.7C2.8 17.1 2 20.5 2 24s.8 6.9 2.3 9.9l7.3-5.7z"/><path fill="#EA4335" d="M24 10.7c4.1 0 6.9 1.8 8.5 3.3l6.2-6.1C35 4.5 30 2 24 2 15.4 2 7.9 7 4.3 14.1l7.3 5.7c1.8-5.3 6.6-9.1 12.4-9.1z"/></svg></span>
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-[var(--color-text)]">¿Ya trabajaste con nosotros?</h2>
            <p class="mt-2 text-[var(--color-text-muted)] leading-relaxed">Tu opinión en Google ayuda a otros negocios a decidir con confianza. Te toma un minuto.</p>
          </div>
          <div class="flex w-full flex-col gap-2.5 sm:w-auto">
            <a [href]="reviewUrl" target="_blank" rel="noopener" class="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5">★ Califícanos en Google</a>
            <a [href]="mapsUrl()" target="_blank" rel="noopener" class="text-center text-sm font-semibold text-[var(--color-accent)] hover:underline">Ver nuestro perfil en Google →</a>
          </div>
        </div>
      }
    </app-section-wrapper>
  `,
})
export class GoogleReviewsComponent {
  protected readonly data = inject(SavvyDataService);
  protected readonly reviewUrl = GOOGLE_REVIEW_URL;
  protected readonly mapsUrl = computed(() => this.data.reviews()?.url || GOOGLE_MAPS_URL);
  protected readonly five = [1, 2, 3, 4, 5];
  protected readonly star = 'm12 2.8 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.6l-5.8 3.1 1.1-6.5L2.6 9.6l6.5-.9z';

  protected fmt(n: number): string {
    return n.toFixed(1).replace('.', ',');
  }
  protected round(n: number): number {
    return Math.round(n);
  }
}
