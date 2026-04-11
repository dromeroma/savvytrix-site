import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';

interface ServiceCategory {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-differentiators',
  standalone: true,
  imports: [SectionWrapperComponent],
  templateUrl: './differentiators.component.html',
  animations: [
    trigger('cardStagger', [
      transition(':enter', [
        query('.diff-card', [
          style({ opacity: 0, transform: 'translateY(24px)' }),
          stagger(100, [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ],
})
export class DifferentiatorsComponent {
  readonly services: ServiceCategory[] = [
    { icon: 'code', title: 'Desarrollo de Software', description: 'Apps web, móviles, APIs REST y microservicios. ERP y CRM a medida.' },
    { icon: 'cpu', title: 'Inteligencia Artificial', description: 'Chatbots, agentes IA, automatización RPA e integración con LLMs.' },
    { icon: 'tool', title: 'Mecatrónica y Hardware', description: 'Sistemas embebidos, automatización industrial, IoT y prototipos.' },
    { icon: 'sprout', title: 'Agro-Tecnología', description: 'Software agrícola, sensórica de cultivos, trazabilidad y comercialización.' },
    { icon: 'layout', title: 'Páginas Web y Landings', description: 'Landing pages de alto impacto, sitios corporativos y tiendas online.' },
    { icon: 'settings', title: 'Consultoría IT', description: 'Auditoría tecnológica, arquitectura de soluciones y migración a la nube.' },
    { icon: 'graduation', title: 'Cursos y Capacitación', description: 'Cursos de programación, talleres de automatización y formación para equipos.' },
    { icon: 'gamepad', title: 'Videojuegos', description: 'Videojuegos indie, experiencias interactivas y simuladores educativos.' },
  ];
}
