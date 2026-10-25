import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { setPageMeta } from '../../services/page-meta';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './terms.component.html',
})
export class TermsComponent {
  constructor() {
    setPageMeta('/terminos', 'Términos y condiciones | Savvytrix Solutions', 'Condiciones de uso de savvytrix.com y de los servicios de Savvytrix Solutions.');
  }
}
