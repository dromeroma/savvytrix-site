import { Component } from '@angular/core';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';

@Component({
  selector: 'app-benefits-by-role',
  standalone: true,
  imports: [SectionWrapperComponent],
  templateUrl: './benefits-by-role.component.html',
})
export class BenefitsByRoleComponent {
  readonly industries = [
    { icon: 'store', name: 'Retail', description: 'Punto de venta, inventario y fiado para tiendas de todo tipo.' },
    { icon: 'heart', name: 'Iglesias', description: 'Gestión de miembros, diezmos, ministerios y eventos.' },
    { icon: 'activity', name: 'Salud', description: 'Agendamiento, historia clínica y facturación para clínicas.' },
    { icon: 'book', name: 'Educación', description: 'Matrículas, notas, horarios y comunicación con padres.' },
    { icon: 'sprout', name: 'Agro', description: 'Monitoreo de cultivos, trazabilidad y comercialización.' },
    { icon: 'building', name: 'Propiedad horizontal', description: 'Administración de conjuntos, cuotas y áreas comunes.' },
    { icon: 'credit-card', name: 'Financiero', description: 'Gestión de créditos, cartera y scoring automático.' },
    { icon: 'gamepad', name: 'Entretenimiento', description: 'Videojuegos, simuladores y experiencias interactivas.' },
  ];
}
