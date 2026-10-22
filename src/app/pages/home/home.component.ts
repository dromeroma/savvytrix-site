import { Component } from '@angular/core';
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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, ProblemsComponent, LinesComponent, NichesComponent, ClientsComponent, ProductsComponent, PlansComponent, MonthlyComponent, OnboardingComponent, AboutComponent, FaqComponent, ContactComponent, FinalCtaComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
