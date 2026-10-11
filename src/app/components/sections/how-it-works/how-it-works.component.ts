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
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
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
      { threshold: 0.15 }
    );

    const stepEls = container.querySelectorAll('.step-item');
    stepEls.forEach((el: Element) => observer.observe(el));

    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  private async initProgressLine(): Promise<void> {
    const container = this.stepsContainer()?.nativeElement;
    if (!container) return;

    const line = container.querySelector('.progress-line-fill');
    if (!line) return;

    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        scrollTrigger: {
          trigger: container,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: true,
        },
      }
    );

    requestAnimationFrame(() => ScrollTrigger.refresh());

    this.destroyRef.onDestroy(() => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }
}
