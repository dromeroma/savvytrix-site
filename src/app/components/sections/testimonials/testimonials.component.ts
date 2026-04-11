import { Component, signal } from '@angular/core';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';
import { Testimonial } from '../../../models/content.model';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [SectionWrapperComponent],
  templateUrl: './testimonials.component.html',
})
export class TestimonialsComponent {
  activeSlide = signal(0);

  readonly testimonials: Testimonial[] = [
    {
      quote: 'Savvitrix nos ayudó a digitalizar toda la operación de nuestras 3 tiendas en menos de un mes. Ahora controlamos inventario, ventas y cajeros desde el celular.',
      name: 'Rodrigo M.',
      business: 'Minimercado Villa del Río',
      city: 'Bogotá',
    },
    {
      quote: 'Necesitábamos un software para gestionar los miembros de nuestra iglesia y Savvitrix lo construyó exactamente como lo necesitábamos. El soporte por WhatsApp es increíble.',
      name: 'Pastor Daniel F.',
      business: 'Iglesia Vida Nueva',
      city: 'Medellín',
    },
    {
      quote: 'Buscamos varias empresas para hacer nuestra app de parqueaderos. Savvitrix fue la única que entendió la operación real del negocio y entregó a tiempo.',
      name: 'Carolina P.',
      business: 'Parking Solutions',
      city: 'Cali',
    },
    {
      quote: 'El equipo de Savvitrix integró sensores IoT en nuestro cultivo de tomate. Ahora monitoreamos humedad y temperatura en tiempo real desde el dashboard.',
      name: 'Miguel A.',
      business: 'Finca San Rafael',
      city: 'Boyacá',
    },
    {
      quote: 'Nos hicieron un landing page que convierte como ninguna otra. El sistema de temas dinámicos fue un diferenciador para nuestra marca.',
      name: 'Sandra B.',
      business: 'Boutique Essence',
      city: 'Barranquilla',
    },
    {
      quote: 'Contratamos el desarrollo de un CRM personalizado. Las entregas semanales con demo funcional nos dieron confianza total durante todo el proceso.',
      name: 'Claudia R.',
      business: 'Distribuidora Nacional',
      city: 'Manizales',
    },
  ];

  nextSlide(): void {
    this.activeSlide.update((v) => (v + 1) % this.testimonials.length);
  }

  prevSlide(): void {
    this.activeSlide.update((v) => (v - 1 + this.testimonials.length) % this.testimonials.length);
  }
}
