import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { ItemComponent } from './item.component';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemComponent],
      providers: [{ provide: CvService, useValue: { selectCv: jasmine.createSpy() } }],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('cv', new Cv(1, 'Ada', 'Lovelace'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
