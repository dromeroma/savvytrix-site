import { Component } from '@angular/core';
import { HeroComponent } from '../../components/sections/hero/hero.component';
import { ClientsComponent } from '../../components/sections/clients/clients.component';
import { LinesComponent } from '../../components/sections/lines/lines.component';
import { NichesComponent } from '../../components/sections/niches/niches.component';
import { MonthlyComponent } from '../../components/sections/monthly/monthly.component';
import { HowItWorksComponent } from '../../components/sections/how-it-works/how-it-works.component';
import { ProblemsComponent } from '../../components/sections/problems/problems.component';
import { ContactComponent } from '../../components/sections/contact/contact.component';
import { FinalCtaComponent } from '../../components/sections/final-cta/final-cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, ProblemsComponent, LinesComponent, NichesComponent, ClientsComponent, MonthlyComponent, HowItWorksComponent, ContactComponent, FinalCtaComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
