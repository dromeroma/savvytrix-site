import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { ThemeMode, PaletteId, PALETTES } from '../models/theme.model';

const STORAGE_KEY = 'sv-theme';
const PALETTE_KEY = 'sv-palette';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private _mode$ = new BehaviorSubject<ThemeMode>('light');
  private _palette$ = new BehaviorSubject<PaletteId>('tropical');

  readonly mode$ = this._mode$.asObservable();
  readonly palette$ = this._palette$.asObservable();
  readonly palettes = PALETTES;

  get mode(): ThemeMode {
    return this._mode$.value;
  }

  get palette(): PaletteId {
    return this._palette$.value;
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  load(): void {
    if (!this.isBrowser()) return;

    const savedMode = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    const savedPalette = localStorage.getItem(PALETTE_KEY) as PaletteId | null;

    if (savedPalette) {
      this._palette$.next(savedPalette);
    }

    if (savedMode) {
      this.setMode(savedMode);
      return;
    }

    const prefersDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setMode(prefersDark ? 'dark' : 'light');
  }

  setMode(mode: ThemeMode): void {
    this._mode$.next(mode);
    if (!this.isBrowser()) return;

    localStorage.setItem(STORAGE_KEY, mode);
    this.applyTheme(mode, this._palette$.value);
  }

  setPalette(paletteId: PaletteId): void {
    this._palette$.next(paletteId);
    if (!this.isBrowser()) return;

    localStorage.setItem(PALETTE_KEY, paletteId);
    if (this._mode$.value === 'fun') {
      this.applyTheme('fun', paletteId);
    }
  }

  private applyTheme(mode: ThemeMode, paletteId: PaletteId): void {
    if (!this.isBrowser()) return;

    const html = document.documentElement;

    if (mode === 'light') {
      html.setAttribute('data-theme', 'light');
    } else if (mode === 'dark') {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.setAttribute('data-theme', `fun-${paletteId}`);
    }
  }

  isDarkText(): boolean {
    const mode = this._mode$.value;
    if (mode === 'dark') return false;
    if (mode === 'light') return true;
    // Fun mode: neon has dark bg
    return this._palette$.value !== 'neon';
  }
}
