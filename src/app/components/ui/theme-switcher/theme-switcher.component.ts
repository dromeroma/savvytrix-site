import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { ThemeMode, PALETTES } from '../../../models/theme.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <div class="relative flex items-center gap-1">
      <!-- Light -->
      <button
        type="button"
        class="p-2 rounded-lg transition-colors duration-200 cursor-pointer"
        [class.bg-[var(--color-accent)]/10]="(theme.mode$ | async) === 'light'"
        [class.text-[var(--color-accent)]]="(theme.mode$ | async) === 'light'"
        [class.text-[var(--color-text-muted)]]="(theme.mode$ | async) !== 'light'"
        (click)="setMode('light')"
        aria-label="Modo claro"
      >
        <!-- Sun icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      </button>

      <!-- Dark -->
      <button
        type="button"
        class="p-2 rounded-lg transition-colors duration-200 cursor-pointer"
        [class.bg-[var(--color-accent)]/10]="(theme.mode$ | async) === 'dark'"
        [class.text-[var(--color-accent)]]="(theme.mode$ | async) === 'dark'"
        [class.text-[var(--color-text-muted)]]="(theme.mode$ | async) !== 'dark'"
        (click)="setMode('dark')"
        aria-label="Modo oscuro"
      >
        <!-- Moon icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>

      <!-- Fun -->
      <button
        type="button"
        class="p-2 rounded-lg transition-colors duration-200 cursor-pointer"
        [class.bg-[var(--color-accent)]/10]="(theme.mode$ | async) === 'fun'"
        [class.text-[var(--color-accent)]]="(theme.mode$ | async) === 'fun'"
        [class.text-[var(--color-text-muted)]]="(theme.mode$ | async) !== 'fun'"
        (click)="toggleFun()"
        aria-label="Modo divertido"
      >
        <!-- Palette icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
      </button>

      <!-- Palette swatches dropdown -->
      @if (showPalettes()) {
        <div class="absolute top-full right-0 mt-2 p-3 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] shadow-lg z-50 flex gap-2">
          @for (p of palettes; track p.id) {
            <button
              type="button"
              class="w-8 h-8 rounded-full border-2 transition-all duration-200 cursor-pointer"
              [style.background]="'linear-gradient(135deg, ' + p.primary + ', ' + p.accent + ')'"
              [class.border-[var(--color-text)]]="(theme.palette$ | async) === p.id"
              [class.border-transparent]="(theme.palette$ | async) !== p.id"
              [class.scale-110]="(theme.palette$ | async) === p.id"
              [title]="p.label"
              (click)="selectPalette(p.id)"
            ></button>
          }
        </div>
      }
    </div>
  `,
})
export class ThemeSwitcherComponent {
  protected theme = inject(ThemeService);
  protected palettes = PALETTES;
  protected showPalettes = signal(false);

  setMode(mode: ThemeMode): void {
    this.showPalettes.set(false);
    this.theme.setMode(mode);
  }

  toggleFun(): void {
    if (this.theme.mode === 'fun') {
      this.showPalettes.update((v) => !v);
    } else {
      this.theme.setMode('fun');
      this.showPalettes.set(true);
    }
  }

  selectPalette(id: string): void {
    this.theme.setPalette(id as any);
  }
}
