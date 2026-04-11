import { Component, computed, input } from '@angular/core';
import { InViewDirective } from '../../../directives/in-view.directive';

@Component({
  selector: 'app-section-wrapper',
  standalone: true,
  imports: [InViewDirective],
  template: `
    <section
      [id]="sectionId()"
      [class]="sectionClasses()"
      appInView
    >
      <div [class]="containerClasses()">
        <ng-content />
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .section-fade-in {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .section-fade-in.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `,
})
export class SectionWrapperComponent {
  sectionId = input('');
  extraClass = input('py-20 lg:py-28');
  innerClass = input('');

  sectionClasses = computed(() => `section-fade-in scroll-mt-20 lg:scroll-mt-24 px-4 sm:px-6 lg:px-8 ${this.extraClass()}`.trim());
  containerClasses = computed(() => `mx-auto max-w-7xl ${this.innerClass()}`.trim());
}
