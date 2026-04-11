import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `
    <span [class]="allClasses()">
      <ng-content />
    </span>
  `,
})
export class BadgeComponent {
  extraClass = input('');

  private readonly base =
    'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20';

  allClasses = computed(() => `${this.base} ${this.extraClass()}`.trim());
}
