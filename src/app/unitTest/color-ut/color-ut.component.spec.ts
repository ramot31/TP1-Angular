import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ColorUtComponent } from "./color-ut.component";

describe("ColorUtComponent", () => {
  let component: ColorUtComponent;
  let fixture: ComponentFixture<ColorUtComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ColorUtComponent],
}).compileComponents();

    fixture = TestBed.createComponent(ColorUtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
