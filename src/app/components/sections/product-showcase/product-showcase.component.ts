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
    // ── Disponibles ──────────────────────────────────────────────────────
    { name: 'SavvyPOS', description: 'Punto de venta para retail latinoamericano', icon: 'shopping-cart', status: 'available', url: SAVVYPOS_APP_URL },
    { name: 'SavvyAccounting', description: 'Contabilidad doble partida y estados financieros', icon: 'calculator', status: 'available', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyChurch', description: 'Gestión integral de iglesias y ministerios', icon: 'heart', status: 'available', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyMemorial', description: 'Gestión funeraria: planes exequiales, servicios, logística y cartera', icon: 'feather', status: 'available', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyWater', description: 'Acueductos comunales: medidores, lecturas, facturación y cartera', icon: 'droplet', status: 'available', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyEdu', description: 'Gestión académica: matrículas, horarios, evaluaciones y notas', icon: 'book-open', status: 'available', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyCredit', description: 'Cartera crediticia: solicitudes, préstamos, amortización y pagos', icon: 'credit-card', status: 'available', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyHealth', description: 'Software clínico: pacientes, citas, notas SOAP y prescripciones', icon: 'activity', status: 'available', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyCondo', description: 'Conjuntos residenciales: cuotas, asambleas, áreas comunes y mantenimiento', icon: 'building', status: 'available', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyCRM', description: 'Pipeline comercial: leads, deals, contactos y actividades', icon: 'users', status: 'available', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyParking', description: 'Parqueaderos: sesiones, tarifas y servicios adicionales', icon: 'map-pin', status: 'available', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyFamily', description: 'Genograma familiar: relaciones, notas clínicas y visualización', icon: 'users-round', status: 'available', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyHR', description: 'Talento humano: empleados, nómina, vacaciones y evaluaciones', icon: 'briefcase', status: 'available', url: SAVVYTRIX_APP_URL },
    // ── Próximamente ─────────────────────────────────────────────────────
    { name: 'SavvyChain', description: 'Cadena de suministro: proveedores, compras, inventarios y trazabilidad', icon: 'link-2', status: 'coming-soon', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyFlow', description: 'Automatización de procesos: flujos de aprobación, tareas y notificaciones', icon: 'git-branch', status: 'coming-soon', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyMarket', description: 'Marketplace y e-commerce: catálogo, carrito, pedidos y pagos', icon: 'shopping-bag', status: 'coming-soon', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyAnalytics', description: 'Business intelligence: reportes, KPIs y visualización avanzada', icon: 'bar-chart', status: 'coming-soon', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyLegal', description: 'Gestión jurídica: contratos, casos y documentos legales', icon: 'scale', status: 'coming-soon', url: SAVVYTRIX_APP_URL },
    { name: 'SavvySecure', description: 'Seguridad física: cámaras, rondas y control de acceso', icon: 'shield', status: 'coming-soon', url: SAVVYTRIX_APP_URL },
    { name: 'SavvyAI', description: 'Agentes IA, asistentes conversacionales y automatización inteligente', icon: 'cpu', status: 'coming-soon', url: SAVVYTRIX_APP_URL },
  ];
}
