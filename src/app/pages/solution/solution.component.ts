import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LINES, NICHES, Niche } from '../../data/solutions';
import { WHATSAPP_URL } from '../../config';
import { ContactComponent } from '../../components/sections/contact/contact.component';
import { FinalCtaComponent } from '../../components/sections/final-cta/final-cta.component';

/** Página de solución por tipo de negocio: problema → solución → caso real → FAQ → cotizar. */
@Component({
  selector: 'app-solution',
  standalone: true,
  imports: [RouterLink, ContactComponent, FinalCtaComponent],
  templateUrl: './solution.component.html',
})
export class SolutionComponent {
  private readonly route = inject(ActivatedRoute);
  readonly n: Niche = NICHES.find((x) => x.slug === this.route.snapshot.data['slug'])!;
  readonly lines = LINES.filter((l) => this.n.lines.includes(l.id));
  readonly waUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(this.n.waMessage)}`;
  readonly others = NICHES.filter((x) => x.slug !== this.n.slug);

  constructor() {
    const url = `https://savvytrix.com/soluciones/${this.n.slug}`;
    inject(Title).setTitle(this.n.seoTitle);
    const meta = inject(Meta);
    meta.updateTag({ name: 'description', content: this.n.seoDescription });
    meta.updateTag({ property: 'og:title', content: this.n.seoTitle });
    meta.updateTag({ property: 'og:description', content: this.n.seoDescription });
    meta.updateTag({ property: 'og:url', content: url });
    const doc = inject(DOCUMENT);
    let link = doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
    // Preguntas frecuentes como datos estructurados (resultados enriquecidos en Google).
    const ld = doc.createElement('script');
    ld.type = 'application/ld+json';
    ld.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.n.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    }).replace(/</g, '\\u003c');
    doc.head.appendChild(ld);
  }
}
