import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/**
 * Título, descripción y URL canónica propios de una página (se llama en el constructor del componente;
 * funciona al prerenderizar). Sin esto la página hereda los de la portada y Google la toma como copia.
 */
export function setPageMeta(path: string, title: string, description: string): void {
  const url = `https://savvytrix.com${path}`;
  inject(Title).setTitle(title);
  const meta = inject(Meta);
  meta.updateTag({ name: 'description', content: description });
  meta.updateTag({ property: 'og:title', content: title });
  meta.updateTag({ property: 'og:description', content: description });
  meta.updateTag({ property: 'og:url', content: url });
  const doc = inject(DOCUMENT);
  let link = doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    doc.head.appendChild(link);
  }
  link.setAttribute('href', url);
}
