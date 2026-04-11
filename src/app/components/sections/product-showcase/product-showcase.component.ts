import { Component } from '@angular/core';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';
import { SAVVYPOS_APP_URL, SAVVYTRIX_APP_URL } from '../../../config';

interface SavvyProduct {
  name: string;
  description: string;
  icon: string;
  status: 'available' | 'coming-soon';
  url: string;
}

@Component({
  selector: 'app-product-showcase',
  standalone: true,
  imports: [SectionWrapperComponent],
  templateUrl: './product-showcase.component.html',
})
export class ProductShowcaseComponent {
  readonly products: SavvyProduct[] = [
    { name: 'SavvyPOS', description: 'Punto de venta para retail latinoamericano', icon: 'shopping-cart', status: 'available', url: SAVVYPOS_APP_URL },
    { name: 'SavvyAccounting', description: 'Contabilidad doble partida + estados financieros', icon: 'calculator', status: 'available', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyChurch', description: 'Gestión integral de iglesias y ministerios', icon: 'heart', status: 'available', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyCondo', description: 'Administración de condominios y conjuntos', icon: 'building', status: 'coming-soon', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyEdu', description: 'Gestión académica para instituciones educativas', icon: 'book-open', status: 'coming-soon', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyHealth', description: 'Software para clínicas y consultorios', icon: 'activity', status: 'coming-soon', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyCRM', description: 'CRM para equipos de ventas y soporte', icon: 'users', status: 'coming-soon', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyCredit', description: 'Gestión de créditos y cartera', icon: 'credit-card', status: 'coming-soon', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyParking', description: 'Control de parqueaderos y accesos', icon: 'map-pin', status: 'coming-soon', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyFamily', description: 'Árbol genealógico y gestión familiar', icon: 'users-round', status: 'coming-soon', url: SAVVYTRIX_APP_URL },
  ];
}
