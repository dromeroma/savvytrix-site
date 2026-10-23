import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { SAVVY_API, SAVVY_TENANT } from '../config';

interface TrackEvent {
  e: string;
  r?: string;
}

const SOCIAL = /(^|\.)(instagram|facebook|fb|tiktok|linkedin|youtube|x|twitter)\.com$/i;

/**
 * Analítica propia de Savvy Sites (panel → Resultados): visitas, páginas vistas y clics a
 * WhatsApp / teléfono / correo / redes. Sin cookies ni datos personales. Igual que en los
 * sitios de los clientes; se envía en lotes con sendBeacon y nunca rompe el sitio.
 */
@Injectable({ providedIn: 'root' })
export class InsightsService {
  private readonly doc = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private queue: TrackEvent[] = [];
  private timer: ReturnType<typeof setTimeout> | null = null;
  private started = false;

  start(): void {
    if (!this.isBrowser || this.started) return;
    this.started = true;
    try {
      if (!sessionStorage.getItem('svy.s')) {
        sessionStorage.setItem('svy.s', '1');
        this.push({ e: 'session' });
      }
    } catch {
      this.push({ e: 'session' });
    }
    // Se llama desde el constructor de la app: la primera navegación también cuenta.
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      this.push({ e: 'page_view', r: (e as NavigationEnd).urlAfterRedirects.split(/[?#]/)[0] || '/' });
    });
    this.doc.addEventListener('click', (ev) => this.onClick(ev), true);
    const flushNow = () => this.flush();
    this.doc.addEventListener('visibilitychange', () => {
      if (this.doc.visibilityState === 'hidden') flushNow();
    });
    this.doc.defaultView?.addEventListener('pagehide', flushNow);
  }

  private onClick(ev: Event): void {
    const a = (ev.target as Element | null)?.closest?.('a');
    const href = a?.getAttribute('href') ?? '';
    if (!href) return;
    const here = this.doc.location.pathname;
    if (href.startsWith('tel:')) return this.push({ e: 'phone_click', r: here });
    if (href.startsWith('mailto:')) return this.push({ e: 'email_click', r: here });
    let host = '';
    try {
      host = new URL(href, this.doc.location.href).hostname;
    } catch {
      return;
    }
    if (host === 'api.whatsapp.com' || host === 'wa.me' || host === 'web.whatsapp.com') {
      this.push({ e: 'whatsapp_click', r: here });
    } else if (SOCIAL.test(host)) {
      this.push({ e: 'social_click', r: host.replace(/^www\./, '') });
    }
  }

  private push(ev: TrackEvent): void {
    this.queue.push(ev);
    if (ev.e.endsWith('_click') || this.queue.length >= 20) return this.flush();
    if (!this.timer) this.timer = setTimeout(() => this.flush(), 3000);
  }

  private flush(): void {
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
    if (!this.queue.length) return;
    const data = JSON.stringify({ tenant: SAVVY_TENANT, events: this.queue.splice(0, 40) });
    const url = SAVVY_API + '/track';
    try {
      const nav = this.doc.defaultView?.navigator;
      if (nav?.sendBeacon && nav.sendBeacon(url, new Blob([data], { type: 'text/plain' }))) return;
      void fetch(url, { method: 'POST', body: data, headers: { 'Content-Type': 'text/plain' }, keepalive: true }).catch(() => {});
    } catch {
      /* la analítica nunca debe romper el sitio */
    }
  }
}
