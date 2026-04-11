import { Component, input } from '@angular/core';

@Component({
  selector: 'app-mockup-frame',
  standalone: true,
  template: `
    <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-2xl overflow-hidden">
      <!-- Window bar -->
      <div class="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)]">
        <span class="w-3 h-3 rounded-full bg-red-400"></span>
        <span class="w-3 h-3 rounded-full bg-yellow-400"></span>
        <span class="w-3 h-3 rounded-full bg-green-400"></span>
        @if (title()) {
          <span class="ml-2 text-xs text-[var(--color-text-muted)]">{{ title() }}</span>
        }
      </div>
      <!-- Content -->
      <div class="aspect-video relative">
        <ng-content />
      </div>
    </div>
  `,
})
export class MockupFrameComponent {
  title = input('');
}
