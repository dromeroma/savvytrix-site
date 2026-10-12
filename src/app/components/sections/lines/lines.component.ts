import { Component } from '@angular/core';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';
import { BRAND_LINE, LINES } from '../../../data/solutions';
import { WHATSAPP_URL } from '../../../config';

/** Qué hacemos: 3 líneas (resultados que compra el cliente) + Marca. */
@Component({
  selector: 'app-lines',
  standalone: true,
  imports: [SectionWrapperComponent],
  templateUrl: './lines.component.html',
})
export class LinesComponent {
  readonly lines = LINES;
  readonly brand = BRAND_LINE;

  quoteUrl(name: string): string {
    return `${WHATSAPP_URL}?text=${encodeURIComponent(`Hola, me interesa "${name}" de Savvytrix. Quiero cotizar.`)}`;
  }
}
