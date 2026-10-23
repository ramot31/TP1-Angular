import { Directive, signal } from '@angular/core';

@Directive({
  selector: 'input[appRainbow]',
  host: {
    '[style.color]': 'color()',
    '[style.borderColor]': 'color()',
    '(keyup)': 'changeColor()',
  },
})
export class RainbowDirective {
  private readonly color = signal('#7c3aed');

  protected changeColor(): void {
    this.color.set(this.generateRandomColor());
  }

  private generateRandomColor(): string {
    const value = Math.floor(Math.random() * 0x1000000);
    return `#${value.toString(16).padStart(6, '0')}`;
  }
}