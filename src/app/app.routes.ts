import { Routes } from '@angular/router';
import { NICHES } from './data/solutions';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  // Una ruta estática por nicho: se prerenderiza cada página (SEO).
  ...NICHES.map((n) => ({
    path: `soluciones/${n.slug}`,
    data: { slug: n.slug },
    loadComponent: () => import('./pages/solution/solution.component').then(m => m.SolutionComponent),
  })),
  {
    path: 'privacidad',
    loadComponent: () => import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent),
  },
  {
    path: 'terminos',
    loadComponent: () => import('./pages/terms/terms.component').then(m => m.TermsComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
