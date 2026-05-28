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
      quote:
        'Como modista llevaba toda mi clientela en un cuaderno: los pedidos, los abonos, las entregas. Con SavvyPOS por fin tengo cada vestido organizado por cliente, sé quién me debe qué y cuánta tela me queda. Mi negocio se ve mucho más serio cuando la clienta ve su factura.',
      name: 'Neila Torres',
      business: 'Sabis Creaciones',
      city: 'Apartadó, Antioquia',
      logo: 'testimonials/sabis-creaciones.png',
    },
    {
      quote:
        'Antes de SavvyPOS perdía dinero porque no sabía bien qué se vendía más ni qué me iba faltando en la estantería. Ahora cierro caja en dos minutos y al otro día sé exactamente qué pedirle al proveedor. Las cajeras lo aprendieron de una y la operación se volvió mucho más rápida.',
      name: 'Eduard Álvarez',
      business: 'Minimercado Bacota',
      city: 'Apartadó, Antioquia',
      logo: 'testimonials/minimercado-bacota.png',
      logoScale: 1.5,
    },
    {
      quote:
        'En la tienda casi todo el mundo me compra fiado. Antes apuntaba todo en hojas que se mojaban o se me perdían. Con SavvyPOS llevo cada deuda en el celular y al cliente le mando el saldo por WhatsApp. Eso solito ya me cambió el negocio.',
      name: 'Eimer Álvarez',
      business: 'Tienda Serranía',
      city: 'Apartadó, Antioquia',
      logo: 'testimonials/tienda-serrania.png',
    },
  ];

  nextSlide(): void {
    this.activeSlide.update((v) => (v + 1) % this.testimonials.length);
  }

  prevSlide(): void {
    this.activeSlide.update((v) => (v - 1 + this.testimonials.length) % this.testimonials.length);
  }
}
