import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ThemeService } from './services/theme.service';
import { WhatsAppWidgetComponent } from './components/ui/whatsapp-widget/whatsapp-widget.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    WhatsAppWidgetComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private theme = inject(ThemeService);

  ngOnInit(): void {
    this.theme.load();
  }
}
