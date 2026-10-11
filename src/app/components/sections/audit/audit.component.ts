import { Component } from '@angular/core';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';
import { WHATSAPP_URL } from '../../../config';

/** Gancho de entrada: auditoría gratis de la presencia del negocio en Google. */
@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [SectionWrapperComponent],
  templateUrl: './audit.component.html',
})
export class AuditComponent {
  readonly auditUrl = `${WHATSAPP_URL}?text=${encodeURIComponent('Hola, quiero la auditoría gratis de mi negocio en Google. Mi negocio se llama: ')}`;

  readonly checks = [
    'Cómo apareces cuando te buscan en Google',
    'Tu ficha de Google Maps y tus reseñas',
    'Tu sitio web o redes, desde el celular',
  ];
}
