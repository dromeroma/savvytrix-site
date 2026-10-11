import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_VERSION } from '../../../version';
import { WHATSAPP_URL } from '../../../config';

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
    { label: 'Páginas web', href: '/#precios' },
    { label: 'Tiendas en línea', href: '/#precios' },
    { label: 'SEO local', href: '/#precios' },
    { label: 'SavvyPOS', href: 'https://savvypos.com/' },
  ];

  readonly serviceLinks = [
    { label: 'Clientes', href: '/#clientes' },
    { label: 'Cómo trabajamos', href: '/#proceso' },
    { label: 'Auditoría gratis', href: '/#auditoria' },
  ];

  readonly companyLinks = [
    { label: 'WhatsApp: 313 548 7605', href: WHATSAPP_URL },
  ];

  readonly socialLinks = [
    { label: 'WhatsApp', href: WHATSAPP_URL, icon: 'whatsapp' },
  ];
}
