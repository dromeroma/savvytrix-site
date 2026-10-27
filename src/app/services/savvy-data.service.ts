import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, afterNextRender, computed, inject, signal } from '@angular/core';

/**
 * Datos administrables desde el panel Savvy Sites (savvytrix.com es un cliente interno).
 *
 * El worker los inserta en la página (<script id="savvy-data">) con caché en el borde. Si el
 * panel no responde, no viene nada y cada sección muestra su contenido escrito en el código:
 * el sitio nunca queda vacío. Se aplican DESPUÉS de hidratar, para no chocar con el HTML
 * prerenderizado (por eso el primer pintado siempre es el del código, idéntico al de hoy).
 */
export interface ShowcaseItem {
  name: string;
  category: 'tiendas' | 'empresariales' | 'profesionales' | 'software';
  kind: string;
  text: string;
  url: string;
  host: string;
  logo: string;
  logoBg: string;
  shot: string;
  inLogos: boolean;
}

export interface HeroSlide {
  eyebrow?: string;
  titleTop?: string;
  titleMain?: string;
  subtitle?: string;
  ctaLabel?: string;
}

export interface Offering {
  slug: string;
  title: string;
  summary: string;
  pricing: { price?: string; priceNote?: string; duration?: string; badge?: string; featured?: boolean };
  deliverables: string[];
}

/** Reseñas de Google del panel (solo visibles, 4–5 ★ y con texto; promedio y total reales). */
export interface GoogleReviews {
  rating: number | null;
  count: number | null;
  url: string;
  items: { author: string; photo: string; rating: number; text: string; publishedAt: string | null }[];
}

interface SiteData {
  branding?: { whatsappNumber?: string; whatsappMessage?: string };
  hero?: HeroSlide[];
  reviews?: GoogleReviews | null;
  offerings?: Offering[];
  content?: {
    faqs?: { q: string; a: string }[];
    cta?: Record<string, string>;
    pricing?: { eyebrow?: string; title?: string; intro?: string };
  };
}

interface Payload {
  site?: SiteData | null;
  showcase?: { items: ShowcaseItem[] } | null;
}

@Injectable({ providedIn: 'root' })
export class SavvyDataService {
  private readonly data = signal<Payload | null>(null);

  readonly site = computed(() => this.data()?.site ?? null);
  /** Clientes con aval (panel → Vitrina). null = usar la lista escrita en el código. */
  readonly showcase = computed(() => {
    const items = this.data()?.showcase?.items;
    return Array.isArray(items) && items.length ? items : null;
  });
  readonly hero = computed(() => this.site()?.hero?.[0] ?? null);
  readonly faqs = computed(() => {
    const f = this.site()?.content?.faqs;
    return Array.isArray(f) && f.length ? f : null;
  });
  readonly cta = computed(() => this.site()?.content?.cta ?? {});
  readonly pricingTexts = computed(() => this.site()?.content?.pricing ?? {});
  /** Planes = servicios del panel que tienen precio o "A tu medida". */
  readonly plans = computed(() => {
    const o = (this.site()?.offerings ?? []).filter((x) => x.pricing && (x.pricing.price || x.pricing.duration));
    return o.length ? o : null;
  });
  /** Reseñas de Google (null = aún no hay; la sección invita a dejar la primera). */
  readonly reviews = computed(() => {
    const r = this.site()?.reviews;
    return r && Array.isArray(r.items) && r.items.length ? r : null;
  });
  readonly whatsappNumber = computed(() => (this.site()?.branding?.whatsappNumber || '').replace(/\D/g, ''));
  readonly whatsappMessage = computed(() => this.site()?.branding?.whatsappMessage || '');

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;
    const doc = inject(DOCUMENT);
    afterNextRender(() => {
      try {
        const raw = doc.getElementById('savvy-data')?.textContent;
        if (raw) this.data.set(JSON.parse(raw) as Payload);
      } catch {
        /* datos dañados: se queda el contenido del código */
      }
    });
  }
}
