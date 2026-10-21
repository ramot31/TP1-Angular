import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { ToastrModule } from '@relynn/ngx-toastr';
import { of } from 'rxjs';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { DetailsCvComponent } from './details-cv.component';

describe('DetailsCvComponent', () => {
  let component: DetailsCvComponent;
  let fixture: ComponentFixture<DetailsCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsCvComponent, ToastrModule.forRoot()],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: '1' } } },
        },
        {
          provide: CvService,
          useValue: { getCvById: () => of(new Cv(1, 'Ada', 'Lovelace')) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
