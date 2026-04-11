import { Component } from '@angular/core';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';
import { InnovationCard } from '../../../models/content.model';

@Component({
  selector: 'app-innovation',
  standalone: true,
  imports: [SectionWrapperComponent],
  templateUrl: './innovation.component.html',
})
export class InnovationComponent {
  readonly cards: InnovationCard[] = [
    {
      icon: 'cpu',
      title: 'Trabaja mientras tú duermes',
      description: 'Reportes automáticos al WhatsApp, recordatorios de fiado, alertas de inventario y cierres de caja solos. Savvy hace el trabajo operativo para que tú te enfoques en crecer.',
    },
    {
      icon: 'globe',
      title: 'Construido para tu realidad',
      description: 'Fiado con score de crédito, pagos por Nequi QR, WhatsApp integrado, facturación electrónica DIAN y soporte en español. No un POS genérico adaptado — uno construido desde cero para el comercio latinoamericano.',
    },
    {
      icon: 'rocket',
      title: 'Crece sin empezar de cero',
      description: 'Empieza con una caja en una tienda. Cuando tengas tres locales y diez cajeros, la misma plataforma te acompaña. Sin migrar datos, sin cambiar de sistema, sin fricción.',
    },
  ];

}
