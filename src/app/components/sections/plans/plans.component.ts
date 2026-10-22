import { Component } from '@angular/core';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';
import { WHATSAPP_URL } from '../../../config';

/** Planes de Savvy Sites con precio "desde" (lista; ver estrategia de precios) + plan Personalizado sin precio público. */
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
      setup: '$2.400.000',
      monthly: '$130.000',
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
      setup: '$3.600.000',
      monthly: '$170.000',
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
      setup: '$5.500.000',
      monthly: '$220.000',
      featured: false,
      features: [
        'Diseño exclusivo para tu marca',
        'Tienda en línea con panel para administrarla',
        'Calculadoras, cotizadores y funciones propias',
        'Conexión con tu sistema de ventas',
      ],
    },
    {
      name: 'Personalizado',
      text: 'Para algo más sencillo o un proyecto tecnológico de mayor envergadura.',
      setup: '',
      monthly: '',
      featured: false,
      features: [
        'Una página sencilla para empezar con poco',
        'Plataformas, portales y aplicaciones a la medida',
        'Integraciones con pagos, facturación u otros sistemas',
        'Alcance, tiempos y precio definidos contigo',
      ],
    },
  ];

  quoteUrl(plan: string): string {
    return `${WHATSAPP_URL}?text=${encodeURIComponent(`Hola, quiero cotizar el plan ${plan} de Savvytrix para mi negocio.`)}`;
  }
}
