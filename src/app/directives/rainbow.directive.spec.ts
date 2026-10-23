import { RainbowDirective } from './rainbow.directive';

describe('RainbowDirective', () => {
  it('should create an instance', () => {
    const directive = new RainbowDirective();
    expect(directive).toBeTruthy();
  });

  it('should update the text and border to the same random color', () => {
    const directive = new RainbowDirective();
    spyOn(Math, 'random').and.returnValue(0.5);

    directive.onKeyUp();

    expect(directive.color).toBe('#800000');
    expect(directive.borderColor).toBe('#800000');
  });
});
