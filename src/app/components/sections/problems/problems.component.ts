import { Component } from '@angular/core';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';

/** Problema → solución: el visitante se reconoce y ve cómo lo resolvemos. */
@Component({
  selector: 'app-problems',
  standalone: true,
  imports: [SectionWrapperComponent],
  templateUrl: './problems.component.html',
})
export class ProblemsComponent {
  readonly items = [
    {
      problem: 'Te buscan en Google y aparece tu competencia, no tú.',
      solution: 'Te posicionamos en tu ciudad con páginas por zona y tu Perfil de Empresa en Google.',
    },
    {
      problem: 'Respondes por WhatsApp las mismas preguntas todo el día.',
      solution: 'Tu catálogo, precios y servicios en línea: el cliente llega sabiendo qué quiere.',
    },
    {
      problem: 'No tienes página, o la que tienes se ve vieja en el celular.',
      solution: 'Un sitio moderno y rápido que tú mismo actualizas desde un panel.',
    },
    {
      problem: 'Llevas ventas, inventario y fiado en cuaderno o en Excel.',
      solution: 'SavvyPOS: un sistema de ventas que funciona aunque se vaya el internet.',
    },
  ];
}
