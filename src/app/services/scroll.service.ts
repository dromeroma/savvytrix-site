import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private platformId = inject(PLATFORM_ID);
  private gsapLoaded = false;

  async initGsap(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || this.gsapLoaded) return;

    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);
    this.gsapLoaded = true;
  }

  async createScrollAnimation(
    trigger: string | Element,
    animation: gsap.TweenVars,
    scrollTriggerVars?: ScrollTrigger.Vars
  ): Promise<gsap.core.Tween | null> {
    if (!isPlatformBrowser(this.platformId)) return null;

    await this.initGsap();
    const { gsap } = await import('gsap');

    return gsap.to(trigger, {
      ...animation,
      scrollTrigger: {
        trigger: trigger as string,
        start: 'top 80%',
        end: 'bottom 20%',
        ...scrollTriggerVars,
      },
    });
  }

  cleanup(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    });
  }
}
