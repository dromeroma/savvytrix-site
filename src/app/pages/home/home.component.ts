import { Component } from '@angular/core';
import { HeroComponent } from '../../components/sections/hero/hero.component';
import { PainComponent } from '../../components/sections/pain/pain.component';
import { ProductShowcaseComponent } from '../../components/sections/product-showcase/product-showcase.component';
import { DifferentiatorsComponent } from '../../components/sections/differentiators/differentiators.component';
import { HowItWorksComponent } from '../../components/sections/how-it-works/how-it-works.component';
import { BenefitsByRoleComponent } from '../../components/sections/benefits-by-role/benefits-by-role.component';
import { ThemingDemoComponent } from '../../components/sections/theming-demo/theming-demo.component';
import { TestimonialsComponent } from '../../components/sections/testimonials/testimonials.component';
import { FinalCtaComponent } from '../../components/sections/final-cta/final-cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    PainComponent,
    ProductShowcaseComponent,
    DifferentiatorsComponent,
    HowItWorksComponent,
    BenefitsByRoleComponent,
    ThemingDemoComponent,
    TestimonialsComponent,
    FinalCtaComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
