import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ToastrModule } from '@relynn/ngx-toastr';
import { Subject, of } from 'rxjs';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { CvComponent } from './cv.component';

describe('CvComponent', () => {
  let component: CvComponent;
  let fixture: ComponentFixture<CvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvComponent, ToastrModule.forRoot()],
      providers: [
        provideRouter([]),
        {
          provide: CvService,
          useValue: {
            getCvs: () => of([]),
            getFakeCvs: () => [],
            selectCv$: new Subject<Cv>(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
