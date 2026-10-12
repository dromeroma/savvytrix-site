import { Component } from '@angular/core';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';
import { WHATSAPP_URL } from '../../../config';

/** Planes de Savvy Sites SIN precio público: cada uno se cotiza por WhatsApp (permite ajustar alcance y precio). */
@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [SectionWrapperComponent],
  templateUrl: './plans.component.html',
})
export class PlansComponent {
  readonly plans = [
    {
      name: 'Esencial',
      text: 'Para empezar a recibir clientes por internet.',
      featured: false,
      features: [
        'Sitio con tu marca, servicios o catálogo',
        'Formulario que llega a tu correo',
        'Botón de WhatsApp',
        'Dominio y correos corporativos',
      ],
    },
    {
      name: 'Profesional',
      text: 'Para aparecer en Google en tu ciudad.',
      featured: true,
      features: [
        'Todo lo del plan Esencial',
        'Páginas por ciudad o zona (SEO local)',
        'Perfil de Empresa en Google y Search Console',
        'Campañas de temporada y tarjeta digital',
      ],
    },
    {
      name: 'A medida',
      text: 'Para tiendas en línea y funciones especiales.',
      featured: false,
      features: [
        'Diseño exclusivo para tu marca',
        'Tienda en línea con panel para administrarla',
        'Calculadoras, cotizadores y funciones propias',
        'Conexión con tu sistema de ventas',
      ],
    },
  ];

  quoteUrl(plan: string): string {
    return `${WHATSAPP_URL}?text=${encodeURIComponent(`Hola, quiero cotizar el plan ${plan} de Savvytrix para mi negocio.`)}`;
  }
}
