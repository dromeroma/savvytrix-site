import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_VERSION } from '../../../version';
import { WHATSAPP_URL, SOCIAL_INSTAGRAM, SOCIAL_LINKEDIN, SOCIAL_TWITTER } from '../../../config';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly version = APP_VERSION;
  readonly currentYear = new Date().getFullYear();

  readonly productLinks = [
    { label: 'SavvyPOS', href: '#productos' },
    { label: 'SavvyAccounting', href: '#productos' },
    { label: 'SavvyChurch', href: '#productos' },
    { label: 'Ver todos', href: '#productos' },
  ];

  readonly serviceLinks = [
    { label: 'Desarrollo de Software', href: '#servicios' },
    { label: 'Inteligencia Artificial', href: '#servicios' },
    { label: 'Mecatrónica', href: '#servicios' },
    { label: 'Consultoría IT', href: '#servicios' },
  ];

  readonly companyLinks = [
    { label: 'Nosotros', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contacto', href: '#contacto' },
    { label: 'Trabaja con nosotros', href: '#' },
  ];

  readonly socialLinks = [
    { label: 'Instagram', href: SOCIAL_INSTAGRAM, icon: 'instagram' },
    { label: 'LinkedIn', href: SOCIAL_LINKEDIN, icon: 'linkedin' },
    { label: 'X', href: SOCIAL_TWITTER, icon: 'twitter' },
    { label: 'WhatsApp', href: WHATSAPP_URL, icon: 'whatsapp' },
  ];
}
