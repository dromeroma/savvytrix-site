import { Component, input, output, signal } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

export interface Tab {
  id: string;
  label: string;
}

@Component({
  selector: 'app-tab-group',
  standalone: true,
  animations: [
    trigger('tabContent', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.98)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.98)' })),
      ]),
    ]),
  ],
  template: `
    <div class="w-full">
      <div class="flex gap-1 border-b border-[var(--color-border)] overflow-x-auto no-scrollbar">
        @for (tab of tabs(); track tab.id) {
          <button
            type="button"
            class="relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 cursor-pointer"
            [class.text-[var(--color-accent)]]="activeTab() === tab.id"
            [class.text-[var(--color-text-muted)]]="activeTab() !== tab.id"
            (click)="selectTab(tab.id)"
          >
            {{ tab.label }}
            @if (activeTab() === tab.id) {
              <span
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent)] transition-transform duration-300"
              ></span>
            }
          </button>
        }
      </div>
      <div class="mt-6">
        <ng-content />
      </div>
    </div>
  `,
})
export class TabGroupComponent {
  tabs = input<Tab[]>([]);
  activeTab = signal('');
  tabChanged = output<string>();

  selectTab(id: string): void {
    this.activeTab.set(id);
    this.tabChanged.emit(id);
  }
}
