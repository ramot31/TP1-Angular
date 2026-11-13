import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ToastrModule } from '@relynn/ngx-toastr';
import { CvService } from '../services/cv.service';
import { AddCvComponent } from './add-cv.component';

describe('AddCvComponent', () => {
  let component: AddCvComponent;
  let fixture: ComponentFixture<AddCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCvComponent, ToastrModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: CvService, useValue: { addCv: jasmine.createSpy() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
