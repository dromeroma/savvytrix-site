import { Component, DestroyRef, PLATFORM_ID, afterNextRender, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CtaService } from '../../../services/cta.service';

/**
 * Celular: barra fija abajo con "Cotizar" y "WhatsApp" en todas las páginas, para que el
 * llamado a la acción nunca se pierda al bajar. Se esconde mientras el formulario está a la vista.
 */
@Component({
  selector: 'app-cta-bar',
  standalone: true,
  template: `
    <div class="h-[4.5rem] sm:hidden" aria-hidden="true"></div>
    <div class="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 px-3 pt-2.5 backdrop-blur-xl transition-transform duration-300 sm:hidden"
      style="padding-bottom: max(0.625rem, env(safe-area-inset-bottom))"
      [class.translate-y-full]="hidden()" [attr.aria-hidden]="hidden() || null">
      <div class="grid grid-cols-2 gap-2.5">
        <a href="/#cotizar" (click)="go($event)" [attr.tabindex]="hidden() ? -1 : null"
          class="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] text-[15px] font-semibold text-white active:scale-[0.97]">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15h6M9 11h2"/></svg>
          Cotizar
        </a>
        <a [href]="cta.waUrl()" target="_blank" rel="noopener noreferrer" [attr.tabindex]="hidden() ? -1 : null"
          class="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] text-[15px] font-semibold text-[#0b2a17] active:scale-[0.97]">
          <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88M20.46 3.49A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41z"/></svg>
          WhatsApp
        </a>
      </div>
    </div>
  `,
})
export class CtaBarComponent {
  readonly cta = inject(CtaService);
  readonly hidden = signal(false);

  constructor() {
    const platform = inject(PLATFORM_ID);
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      if (!isPlatformBrowser(platform) || !('IntersectionObserver' in window)) return;
      // El formulario puede no existir aún (cambio de página): se vuelve a buscar en cada vistazo.
      const seen = new Set<Element>();
      const io = new IntersectionObserver((entries) => {
        for (const e of entries) e.isIntersecting ? seen.add(e.target) : seen.delete(e.target);
        this.hidden.set(seen.size > 0);
      }, { threshold: 0.15 });
      const watch = () => {
        const f = document.querySelector('#cotizar form, #cotizar [data-sent]');
        if (f && !seen.has(f)) io.observe(f);
      };
      const mo = new MutationObserver(watch);
      mo.observe(document.body, { childList: true, subtree: true });
      watch();
      destroy.onDestroy(() => { io.disconnect(); mo.disconnect(); });
    });
  }

  go(ev: Event): void {
    if (document.getElementById('cotizar')) {
      ev.preventDefault();
      this.cta.goToForm();
    }
  }
}
