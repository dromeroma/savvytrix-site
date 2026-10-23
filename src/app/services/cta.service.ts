import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { WHATSAPP_URL } from '../config';
import { NICHES } from '../data/solutions';
import { SavvyDataService } from './savvy-data.service';

const DEFAULT_WA = 'Hola, quiero información sobre los servicios de Savvytrix Solutions';

/**
 * Llamados a la acción del sitio: el mensaje de WhatsApp según la página (cada solución
 * tiene el suyo) y el plan que el visitante eligió para que el formulario lo traiga marcado.
 */
@Injectable({ providedIn: 'root' })
export class CtaService {
  private readonly doc = inject(DOCUMENT);
  private readonly data = inject(SavvyDataService);
  private readonly path = signal('/');
  /** Plan elegido en "Quiero este plan" (el formulario lo muestra y lo envía). */
  readonly plan = signal('');

  constructor() {
    const router = inject(Router);
    this.path.set(router.url.split(/[?#]/)[0] || '/');
    router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      this.path.set((e as NavigationEnd).urlAfterRedirects.split(/[?#]/)[0] || '/');
    });
  }

  /** Mensaje de WhatsApp para la página actual. */
  readonly waMessage = computed(() => {
    const p = this.path();
    const n = p.startsWith('/soluciones/') ? NICHES.find((x) => p === '/soluciones/' + x.slug) : null;
    if (n) return n.waMessage;
    if (this.plan()) return `Hola, quiero cotizar el plan ${this.plan()} de Savvytrix para mi negocio.`;
    return this.data.whatsappMessage() || DEFAULT_WA;
  });

  readonly waUrl = computed(() => wa(this.waMessage(), this.data.whatsappNumber()));

  /** Elige un plan y baja al formulario de cotización. */
  choosePlan(name: string): void {
    this.plan.set(name);
    this.goToForm();
  }

  goToForm(): void {
    const el = this.doc.getElementById('cotizar');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else this.doc.location.href = '/#cotizar';
  }
}

/** Enlace de WhatsApp. `phone` (del panel → Marca) reemplaza al número del código si viene. */
export function wa(message: string, phone = ''): string {
  const base = phone ? `https://wa.me/${phone}` : WHATSAPP_URL;
  return `${base}?text=${encodeURIComponent(message)}`;
}
