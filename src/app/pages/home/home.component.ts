import { Component } from '@angular/core';
import { setPageMeta } from '../../services/page-meta';
import { HeroComponent } from '../../components/sections/hero/hero.component';
import { ClientsComponent } from '../../components/sections/clients/clients.component';
import { ProductsComponent } from '../../components/sections/products/products.component';
import { LinesComponent } from '../../components/sections/lines/lines.component';
import { NichesComponent } from '../../components/sections/niches/niches.component';
import { PlansComponent } from '../../components/sections/plans/plans.component';
import { MonthlyComponent } from '../../components/sections/monthly/monthly.component';
import { OnboardingComponent } from '../../components/sections/onboarding/onboarding.component';
import { AboutComponent } from '../../components/sections/about/about.component';
import { FaqComponent } from '../../components/sections/faq/faq.component';
import { ProblemsComponent } from '../../components/sections/problems/problems.component';
import { ContactComponent } from '../../components/sections/contact/contact.component';
import { FinalCtaComponent } from '../../components/sections/final-cta/final-cta.component';
import { CtaStripComponent } from '../../components/shared/cta-strip/cta-strip.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, ProblemsComponent, LinesComponent, NichesComponent, ClientsComponent, ProductsComponent, PlansComponent, MonthlyComponent, OnboardingComponent, AboutComponent, FaqComponent, ContactComponent, FinalCtaComponent, CtaStripComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor() {
    setPageMeta(
      '/',
      'Savvytrix Solutions · Páginas web, tiendas en línea y sistemas para negocios',
      'Te ponemos en Google, te armamos tu tienda en línea y te damos el sistema para vender y controlar tu negocio. Para tiendas, ferreterías, profesionales y comercios en Colombia.',
    );
  }
}
