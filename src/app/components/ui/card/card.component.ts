import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div [class]="allClasses()">
      <ng-content />
    </div>
  `,
})
export class CardComponent {
  extraClass = input('');

  private readonly base =
    'rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1';

  allClasses = computed(() => `${this.base} ${this.extraClass()}`.trim());
}
