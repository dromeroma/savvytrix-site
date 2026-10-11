import {
  Directive,
  ElementRef,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appInView]',
  standalone: true,
})
export class InViewDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  // threshold 0 = se revela apenas asoma 1px. Con 0.15, una sección más alta que el viewport del
  // celular (p. ej. Precios, ~2000px) podía no alcanzar nunca ese 15% y quedaba invisible.
  threshold = input(0);

  @Output() inView = new EventEmitter<boolean>();

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    // Solo se oculta (para animar) cuando el navegador puede revelarlo: el HTML prerenderizado
    // queda visible para Google, vistas previas y navegadores sin JS.
    if (typeof IntersectionObserver === 'undefined') {
      this.el.nativeElement.classList.add('is-visible');
      return;
    }
    this.el.nativeElement.classList.add('fade-ready');

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.inView.emit(true);
          this.el.nativeElement.classList.add('is-visible');
          this.observer?.unobserve(this.el.nativeElement);
        }
      },
      { threshold: this.threshold(), rootMargin: '0px 0px -8% 0px' }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
