import { Component } from '@angular/core';
import { RainbowDirective } from '../../directives/rainbow.directive';

@Component({
  selector: 'app-rainbow-input',
  standalone: true,
  imports: [RainbowDirective],
  templateUrl: './rainbow-input.component.html',
  styleUrl: './rainbow-input.component.css',
})
export class RainbowInputComponent {}