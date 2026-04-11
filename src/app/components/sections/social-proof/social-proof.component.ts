import { Component } from '@angular/core';
import { AnimatedCounterComponent } from '../../ui/animated-counter/animated-counter.component';

@Component({
  selector: 'app-social-proof',
  standalone: true,
  imports: [AnimatedCounterComponent],
  templateUrl: './social-proof.component.html',
})
export class SocialProofComponent {
  readonly stats = [
    { value: 300, suffix: '+', label: 'Negocios activos' },
    { value: 120000, suffix: '+', label: 'Transacciones procesadas' },
    { value: 5, suffix: ' países', label: 'Presencia en LATAM' },
  ];

  readonly businessTypes = [
    'Minimercado', 'Farmacia', 'Ferretería', 'Papelería',
    'Tienda de ropa', 'Restaurante', 'Panadería', 'Licorería',
    'Minimercado', 'Farmacia', 'Ferretería', 'Papelería',
    'Tienda de ropa', 'Restaurante', 'Panadería', 'Licorería',
  ];
}
