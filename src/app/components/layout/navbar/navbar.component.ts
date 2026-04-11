import { Component, signal, inject, PLATFORM_ID, afterNextRender, DestroyRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeSwitcherComponent } from '../../ui/theme-switcher/theme-switcher.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { CONTACT_WHATSAPP_URL } from '../../../config';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ThemeSwitcherComponent, ButtonComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);
  readonly contactUrl = CONTACT_WHATSAPP_URL;
  isScrolled = signal(false);
  mobileMenuOpen = signal(false);

  readonly navLinks = [
    { label: 'Productos', href: '#productos' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proceso', href: '#proceso' },
    { label: 'Contacto', href: '#contacto' },
  ];

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      const onScroll = () => this.isScrolled.set(window.scrollY > 50);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }

  toggleMobile(): void {
    this.mobileMenuOpen.update((v) => !v);
  }

  closeMobile(): void {
    this.mobileMenuOpen.set(false);
  }
}
