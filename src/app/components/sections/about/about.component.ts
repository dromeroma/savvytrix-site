import { Component } from '@angular/core';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';

/** Quiénes somos: por qué confiar (plataformas propias = soporte directo). */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SectionWrapperComponent],
  template: `
    <app-section-wrapper sectionId="nosotros">
      <div class="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div>
          <p class="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">Quiénes somos</p>
          <h2 class="text-3xl sm:text-4xl font-bold text-[var(--color-text)] leading-tight text-balance">
            Una empresa colombiana que construye su propia tecnología.
          </h2>
          <p class="mt-4 text-[var(--color-text-muted)] leading-relaxed">
            Savvytrix Solutions desarrolla y opera sus propias plataformas: <strong class="text-[var(--color-text)]">Savvy Sites</strong>
            para sitios y tiendas en línea, y <strong class="text-[var(--color-text)]">SavvyPOS</strong> para vender y controlar tu negocio.
            No revendemos herramientas de otros: cuando necesitas un cambio o tienes un problema, hablas
            directamente con quien lo construyó.
          </p>
        </div>
        <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          @for (p of points; track p.title) {
            <li class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-5">
              <h3 class="font-bold text-[var(--color-text)]">{{ p.title }}</h3>
              <p class="mt-1.5 text-sm leading-relaxed text-[var(--color-text-muted)]">{{ p.text }}</p>
            </li>
          }
        </ul>
      </div>
    </app-section-wrapper>
  `,
})
export class AboutComponent {
  readonly points = [
    { title: 'Tecnología propia', text: 'Savvy Sites y SavvyPOS son nuestros: los mejoramos con lo que piden los clientes.' },
    { title: 'Soporte directo', text: 'Por WhatsApp, con personas que conocen tu negocio.' },
    { title: 'Clientes reales', text: 'Negocios en Cartagena y San Onofre ya venden con nuestras plataformas.' },
    { title: 'Todo Colombia', text: 'Trabajamos a distancia con negocios de cualquier ciudad.' },
  ];
}
