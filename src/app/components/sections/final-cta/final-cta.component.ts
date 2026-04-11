import { Component } from '@angular/core';
import { CONTACT_WHATSAPP_URL, PROJECT_WHATSAPP_URL } from '../../../config';

@Component({
  selector: 'app-final-cta',
  standalone: true,
  templateUrl: './final-cta.component.html',
})
export class FinalCtaComponent {
  readonly contactUrl = CONTACT_WHATSAPP_URL;
  readonly projectUrl = PROJECT_WHATSAPP_URL;
}
