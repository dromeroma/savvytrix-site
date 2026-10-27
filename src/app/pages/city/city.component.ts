import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CITIES, City } from '../../data/cities';
import { CaseStudy, LINES, NICHES } from '../../data/solutions';
import { GOOGLE_MAPS_URL, GOOGLE_REVIEW_URL, WHATSAPP_URL } from '../../config';
import { ContactComponent } from '../../components/sections/contact/contact.component';
import { FinalCtaComponent } from '../../components/sections/final-cta/final-cta.component';

/** Todos los casos reales (principal + "también confían") de las páginas de soluciones. */
const ALL_CASES: CaseStudy[] = NICHES.flatMap((n) => [n.caseStudy, ...(n.moreCases ?? [])]).filter(
  (c, i, arr): c is CaseStudy => !!c && arr.findIndex((x) => x?.client === c.client) === i,
);
/** Cuando la ciudad aún no tiene clientes propios: casos de otras ciudades (diciéndolo). */
const FEATURED = ['JEK Ingeniería', 'Yes Computo', 'Mary Cake & Dessert'];

/** Página por ciudad o región: cómo te atendemos ahí → qué hacemos → clientes de la zona → FAQ → cotizar. */
@Component({
  selector: 'app-city',
  standalone: true,
  imports: [RouterLink, ContactComponent, FinalCtaComponent],
  templateUrl: './city.component.html',
})
export class CityComponent {
  private readonly route = inject(ActivatedRoute);
  readonly c: City = CITIES.find((x) => x.slug === this.route.snapshot.data['slug'])!;
  readonly lines = LINES;
  readonly localCases = this.c.cases.map((n) => ALL_CASES.find((x) => x.client === n)).filter((x): x is CaseStudy => !!x);
  readonly cases = this.localCases.length ? this.localCases : FEATURED.map((n) => ALL_CASES.find((x) => x.client === n)).filter((x): x is CaseStudy => !!x);
  readonly sectors = this.c.sectors.map((s) => NICHES.find((n) => n.slug === s)).filter((n) => !!n);
  readonly others = CITIES.filter((x) => x.slug !== this.c.slug);
  readonly waUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(this.c.waMessage)}`;
  readonly mapsUrl = GOOGLE_MAPS_URL;
  readonly reviewUrl = GOOGLE_REVIEW_URL;

  constructor() {
    const url = `https://savvytrix.com/diseno-web/${this.c.slug}`;
    inject(Title).setTitle(this.c.seoTitle);
    const meta = inject(Meta);
    meta.updateTag({ name: 'description', content: this.c.seoDescription });
    meta.updateTag({ property: 'og:title', content: this.c.seoTitle });
    meta.updateTag({ property: 'og:description', content: this.c.seoDescription });
    meta.updateTag({ property: 'og:url', content: url });
    const doc = inject(DOCUMENT);
    let link = doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
    // Servicio con su zona + preguntas frecuentes, como datos estructurados.
    const ld = doc.createElement('script');
    ld.type = 'application/ld+json';
    ld.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: `Diseño de páginas web en ${this.c.short}`,
          serviceType: 'Diseño de sitios web, tiendas en línea y sistemas de venta',
          provider: { '@id': 'https://savvytrix.com/#organization' },
          areaServed: [this.c.short, ...this.c.nearby].map((name) => ({ '@type': 'Place', name })),
          url,
        },
        {
          '@type': 'FAQPage',
          mainEntity: this.c.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        },
      ],
    }).replace(/</g, '\\u003c');
    doc.head.appendChild(ld);
  }
}
