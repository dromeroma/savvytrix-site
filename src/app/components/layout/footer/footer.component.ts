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
    { label: 'Tiendas de tecnología', href: '/soluciones/tiendas-de-tecnologia' },
    { label: 'Electrodomésticos y sonido', href: '/soluciones/electrodomesticos-y-sonido' },
    { label: 'Ferreterías y materiales', href: '/soluciones/ferreterias-y-materiales' },
    { label: 'Viveros y jardinería', href: '/soluciones/viveros-y-jardineria' },
    { label: 'Artesanías y hecho a mano', href: '/soluciones/artesanias-y-hecho-a-mano' },
    { label: 'Pastelerías y repostería', href: '/soluciones/pastelerias-y-reposteria' },
    { label: 'Belleza y accesorios', href: '/soluciones/belleza-y-accesorios' },
    { label: 'Comercios y tiendas', href: '/soluciones/comercios-y-tiendas' },
    { label: 'Profesionales y servicios', href: '/soluciones/profesionales-y-servicios' },
    { label: 'Empresas de internet', href: '/soluciones/empresas-de-internet' },
    { label: 'Software para negocios', href: '/soluciones/software-para-negocios' },
    { label: 'SavvyPOS', href: 'https://savvypos.com/' },
  ];

  readonly serviceLinks = [
    { label: 'Qué hacemos', href: '/#soluciones' },
    { label: 'Clientes', href: '/#clientes' },
    { label: 'Desarrollos propios', href: '/#desarrollos' },
    { label: 'Cómo funciona', href: '/#proceso' },
    { label: 'Preguntas frecuentes', href: '/#preguntas' },
    { label: 'Quiénes somos', href: '/#nosotros' },
    { label: 'Cotizar', href: '/#cotizar' },
  ];

  readonly companyLinks = [
    { label: 'WhatsApp: 313 548 7605', href: WHATSAPP_URL },
  ];

  readonly socialLinks = [
    { label: 'WhatsApp', href: WHATSAPP_URL, icon: 'whatsapp' },
  ];
}
