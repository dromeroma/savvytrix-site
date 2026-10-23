import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ThemeService } from './services/theme.service';
import { WhatsAppWidgetComponent } from './components/ui/whatsapp-widget/whatsapp-widget.component';
import { CtaBarComponent } from './components/ui/cta-bar/cta-bar.component';
import { InsightsService } from './services/insights.service';
import { SavvyDataService } from './services/savvy-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    WhatsAppWidgetComponent,
    CtaBarComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private theme = inject(ThemeService);

  constructor() {
    // Visitas y clics de contacto → panel Savvy Sites (Resultados).
    inject(InsightsService).start();
    // Contenido del panel (vitrina, planes, preguntas…): se aplica al terminar de hidratar.
    inject(SavvyDataService);
  }

  ngOnInit(): void {
    this.theme.load();
  }
}
