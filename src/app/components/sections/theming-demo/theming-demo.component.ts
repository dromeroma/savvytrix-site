import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { SectionWrapperComponent } from '../../shared/section-wrapper/section-wrapper.component';
import { ThemeService } from '../../../services/theme.service';
import { ThemeMode, PALETTES } from '../../../models/theme.model';

@Component({
  selector: 'app-theming-demo',
  standalone: true,
  imports: [SectionWrapperComponent, AsyncPipe],
  templateUrl: './theming-demo.component.html',
})
export class ThemingDemoComponent {
  protected theme = inject(ThemeService);
  protected palettes = PALETTES;

  setMode(mode: ThemeMode): void {
    this.theme.setMode(mode);
  }

  setPalette(id: string): void {
    this.theme.setPalette(id as any);
  }
}
