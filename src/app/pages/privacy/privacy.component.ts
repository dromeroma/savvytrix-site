import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { setPageMeta } from '../../services/page-meta';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './privacy.component.html',
})
export class PrivacyComponent {
  constructor() {
    setPageMeta('/privacidad', 'Política de privacidad | Savvytrix Solutions', 'Cómo Savvytrix Solutions recolecta, usa y protege los datos que nos compartes en savvytrix.com.');
  }
}
