import { Component, computed, inject } from '@angular/core';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';
import { CtaService, wa } from '../../../services/cta.service';
import { SavvyDataService } from '../../../services/savvy-data.service';

interface Plan {
  name: string;
  text: string;
  /** Precio de creación (vacío = "A tu medida"). */
  setup: string;
  /** Línea bajo el precio, p. ej. "+ desde $170.000 al mes". */
  note: string;
  badge: string;
  featured: boolean;
  features: string[];
}

/** Planes de Savvy Sites con precio "desde" (lista; ver estrategia de precios) + plan Personalizado sin precio público. */
@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [SectionWrapperComponent],
  templateUrl: './plans.component.html',
})
export class PlansComponent {
  private readonly cta = inject(CtaService);
  private readonly data = inject(SavvyDataService);

  /** Respaldo si el panel no responde (los planes se editan en el panel → Servicios, con su precio). */
  private readonly fallback = [
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

  readonly plans = computed<Plan[]>(() => {
    const fromPanel = this.data.plans();
    if (fromPanel) {
      return fromPanel.map((o) => ({
        name: o.title,
        text: o.summary,
        setup: o.pricing.price || '',
        note: o.pricing.price ? o.pricing.priceNote || '' : o.pricing.priceNote || 'Según el alcance de tu proyecto',
        badge: o.pricing.badge || (o.pricing.featured ? 'Recomendado' : ''),
        featured: !!o.pricing.featured,
        features: o.deliverables || [],
      }));
    }
    return this.fallback.map((p) => ({
      name: p.name, text: p.text, setup: p.setup, featured: p.featured, features: p.features,
      note: p.setup ? `+ desde ${p.monthly} al mes` : 'Según el alcance de tu proyecto',
      badge: p.featured ? 'Recomendado' : '',
    }));
  });

  /** Textos de la sección (panel → Contenido → Planes y precios). */
  readonly texts = computed(() => {
    const t = this.data.pricingTexts();
    return {
      eyebrow: t.eyebrow || 'Planes',
      title: t.title || 'Un plan para cada etapa de tu negocio.',
      intro: t.intro || 'Un pago por crear tu sitio y una mensualidad que incluye alojamiento, soporte y actualizaciones. El valor exacto te lo enviamos por escrito antes de empezar.',
    };
  });

  /** "Quiero este plan": baja al formulario con el plan ya marcado. */
  choose(ev: Event, plan: string): void {
    ev.preventDefault();
    this.cta.choosePlan(plan);
  }

  quoteUrl(plan: string): string {
    return wa(`Hola, quiero cotizar el plan ${plan} de Savvytrix para mi negocio.`, this.data.whatsappNumber());
  }
}
