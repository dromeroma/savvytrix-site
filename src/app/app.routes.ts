import { Routes } from '@angular/router';
import { NICHES } from './data/solutions';
import { CITIES } from './data/cities';

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
  // Una página por ciudad o región (SEO local), también prerenderizada.
  ...CITIES.map((c) => ({
    path: `diseno-web/${c.slug}`,
    data: { slug: c.slug },
    loadComponent: () => import('./pages/city/city.component').then(m => m.CityComponent),
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
