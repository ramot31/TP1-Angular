import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appRainbow]',
  exportAs: 'appRainbow',
  standalone: false,
})
export class RainbowDirective {
  @HostBinding('style.color') color = '#7c3aed';
  @HostBinding('style.borderColor') borderColor = this.color;

  @HostListener('keyup')
  onKeyUp(): void {
    const randomColor = this.getRandomColor();
    this.color = randomColor;
    this.borderColor = randomColor;
  }

  private getRandomColor(): string {
    const value = Math.floor(Math.random() * 0x1000000);
    return '#' + value.toString(16).padStart(6, '0');
  }
}
