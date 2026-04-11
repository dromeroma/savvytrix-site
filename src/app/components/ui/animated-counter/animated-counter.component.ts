import {
  Component,
  ElementRef,
  DestroyRef,
  afterNextRender,
  viewChild,
  input,
  signal,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-animated-counter',
  standalone: true,
  template: `<span #counter>{{ displayValue() }}</span>`,
})
export class AnimatedCounterComponent {
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);
  target = input(0);
  duration = input(2000);
  prefix = input('');
  suffix = input('');

  displayValue = signal('0');
  private counterRef = viewChild<ElementRef>('counter');
  private observer?: IntersectionObserver;
  private rafId?: number;

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.animate();
            this.observer?.disconnect();
          }
        },
        { threshold: 0.5 }
      );

      const el = this.counterRef()?.nativeElement;
      if (el) this.observer.observe(el);

      this.destroyRef.onDestroy(() => {
        this.observer?.disconnect();
        if (this.rafId) cancelAnimationFrame(this.rafId);
      });
    });
  }

  private animate(): void {
    const start = performance.now();
    const end = this.target();
    const dur = this.duration();

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / dur, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(eased * end);
      this.displayValue.set(`${this.prefix()}${current.toLocaleString()}${this.suffix()}`);

      if (progress < 1) {
        this.rafId = requestAnimationFrame(step);
      }
    };

    this.rafId = requestAnimationFrame(step);
  }
}
