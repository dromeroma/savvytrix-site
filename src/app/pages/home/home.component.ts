import { Component } from '@angular/core';
import { HeroComponent } from '../../components/sections/hero/hero.component';
import { ClientsComponent } from '../../components/sections/clients/clients.component';
import { PlansComponent } from '../../components/sections/plans/plans.component';
import { HowItWorksComponent } from '../../components/sections/how-it-works/how-it-works.component';
import { AuditComponent } from '../../components/sections/audit/audit.component';
import { FinalCtaComponent } from '../../components/sections/final-cta/final-cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, ClientsComponent, PlansComponent, HowItWorksComponent, AuditComponent, FinalCtaComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
