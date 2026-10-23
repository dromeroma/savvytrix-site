import { Component, computed, inject } from '@angular/core';
import { PROJECT_WHATSAPP_URL } from '../../../config';
import { SavvyDataService } from '../../../services/savvy-data.service';
import { wa } from '../../../services/cta.service';

@Component({
  selector: 'app-final-cta',
  standalone: true,
  templateUrl: './final-cta.component.html',
})
export class FinalCtaComponent {
  private readonly data = inject(SavvyDataService);
  /** Textos del panel (Contenido → Llamados a la acción); si no hay, los de siempre. */
  readonly t = computed(() => {
    const c = this.data.cta();
    return {
      title: c['closingTitle'] || '¿Listo para hacer crecer tu negocio?',
      text: c['closingText'] || 'En una conversación te decimos qué necesitas y te enviamos tu cotización.',
      wa: c['whatsappLabel'] || 'Escribir por WhatsApp',
    };
  });
  readonly projectUrl = computed(() => (this.data.cta()['waMessage'] ? wa(this.data.cta()['waMessage'], this.data.whatsappNumber()) : PROJECT_WHATSAPP_URL));
}
