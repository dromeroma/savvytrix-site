import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appParallax]',
  standalone: true,
})
export class ParallaxDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private rafId?: number;
  private boundOnScroll = this.onScroll.bind(this);

  speed = input(0.3);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.addEventListener('scroll', this.boundOnScroll, { passive: true });
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.removeEventListener('scroll', this.boundOnScroll);
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  private onScroll(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => {
      const rect = this.el.nativeElement.getBoundingClientRect();
      const offset = -rect.top * this.speed();
      this.el.nativeElement.style.transform = `translateY(${offset}px)`;
    });
  }
}
