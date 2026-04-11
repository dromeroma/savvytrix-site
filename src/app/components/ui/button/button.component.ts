import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <a
      [attr.href]="href() || null"
      [attr.target]="href() ? target() : null"
      [attr.role]="href() ? null : 'button'"
      [class]="allClasses()"
    >
      <ng-content />
    </a>
  `,
})
export class ButtonComponent {
  variant = input<'primary' | 'outline' | 'ghost' | 'whatsapp'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');
  href = input<string>('');
  target = input<string>('_self');
  type = input<string>('button');

  private readonly base =
    'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 ease-out rounded-xl cursor-pointer active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)]';

  allClasses = computed(() => {
    const v = this.variant();
    const s = this.size();

    const variantCls =
      v === 'primary'
        ? 'bg-[var(--color-accent)] text-white hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,201,167,0.3)]'
        : v === 'outline'
          ? 'border-2 border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-bg-alt)] hover:scale-[1.02]'
          : v === 'ghost'
            ? 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            : 'bg-[#25D366] text-white hover:bg-[#20BD5A] hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(37,211,102,0.3)]';

    const sizeCls =
      s === 'sm' ? 'px-4 py-2 text-sm' : s === 'lg' ? 'px-8 py-4 text-lg' : 'px-6 py-3 text-base';

    return `${this.base} ${variantCls} ${sizeCls}`;
  });
}
