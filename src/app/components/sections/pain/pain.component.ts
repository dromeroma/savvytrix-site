import { Component } from '@angular/core';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';

@Component({
  selector: 'app-pain',
  standalone: true,
  imports: [SectionWrapperComponent],
  templateUrl: './pain.component.html',
})
export class PainComponent {
  readonly values = [
    {
      icon: 'code',
      title: 'Experiencia multi-industria',
      description: 'Retail, salud, educación, agro, iglesias, propiedad horizontal. No somos genéricos — construimos para cada realidad.',
    },
    {
      icon: 'globe',
      title: 'Hechos para Latinoamérica',
      description: 'Nuestro software nace en LATAM y para LATAM. Entendemos las regulaciones, los pagos locales y la realidad del comercio.',
    },
    {
      icon: 'shield',
      title: 'Tecnología que escala',
      description: 'Angular, FastAPI, Supabase, IA. Stack moderno que crece contigo: desde un MVP hasta una operación multi-sede.',
    },
    {
      icon: 'headphones',
      title: 'Soporte humano y local',
      description: 'No estás solo. Equipo en Colombia con soporte real por WhatsApp, en tu idioma y en tu horario.',
    },
  ];
}
