import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { ButtonComponent } from '../../ui/button/button.component';
import { BadgeComponent } from '../../ui/badge/badge.component';
import { CONTACT_WHATSAPP_URL } from '../../../config';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent, BadgeComponent],
  templateUrl: './hero.component.html',
  animations: [
    trigger('heroEnter', [
      transition(':enter', [
        query('.hero-anim', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(120, [
            animate('800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ], { optional: true }),
      ]),
    ]),
  ],
})
export class HeroComponent {
  readonly contactUrl = CONTACT_WHATSAPP_URL;
}
