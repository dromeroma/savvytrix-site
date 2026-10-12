import { Component, afterNextRender, inject, PLATFORM_ID, DestroyRef, ElementRef, viewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [SectionWrapperComponent],
  templateUrl: './how-it-works.component.html',
  styles: `
    .step-item {
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .step-item.fade-ready:not(.is-visible) {
      opacity: 0;
      transform: translateY(40px);
    }
    .step-item.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
    .step-item:nth-child(2) { transition-delay: 0.15s; }
    .step-item:nth-child(3) { transition-delay: 0.3s; }
    .step-item:nth-child(4) { transition-delay: 0.45s; }
  `,
})
export class HowItWorksComponent {
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);
  stepsContainer = viewChild<ElementRef>('stepsContainer');

  readonly steps: ProcessStep[] = [
    {
      number: '01',
      title: 'Nos cuentas tu negocio',
      description: 'Por WhatsApp o en una llamada. Te decimos qué necesitas y cuánto cuesta, sin rodeos.',
      icon: 'message',
    },
    {
      number: '02',
      title: 'Construimos tu sitio',
      description: 'Con tu marca, tus productos y tus datos. Apruebas cada paso antes de publicarlo.',
      icon: 'code',
    },
    {
      number: '03',
      title: 'Te acompañamos cada mes',
      description: 'Tu sitio no se queda quieto: lo actualizamos, lo cuidamos y trabajamos para que te encuentren en Google.',
      icon: 'rocket',
    },
  ];

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      this.initStepObservers();
      this.initProgressLine();
    });
  }

  private initStepObservers(): void {
    const container = this.stepsContainer()?.nativeElement;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0 }
    );

    const stepEls = container.querySelectorAll('.step-item');
    stepEls.forEach((el: Element) => {
      el.classList.add('fade-ready'); // solo se oculta si el navegador lo va a revelar
      observer.observe(el);
    });

    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  /** Línea de progreso: se llena al entrar la sección. Sin GSAP/ScrollTrigger: su refresh()
   *  interrumpía el scroll hacia /#planes y otras anclas. */
  private initProgressLine(): void {
    const container = this.stepsContainer()?.nativeElement;
    const line = container?.querySelector('.progress-line-fill') as HTMLElement | null;
    if (!container || !line) return;
    line.style.transform = 'scaleY(0)';
    line.style.transition = 'transform 1.2s ease-out';
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        line.style.transform = 'scaleY(1)';
        io.disconnect();
      }
    }, { threshold: 0 });
    io.observe(container);
    this.destroyRef.onDestroy(() => io.disconnect());
  }
}
