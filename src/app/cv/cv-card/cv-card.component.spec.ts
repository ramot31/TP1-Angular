import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ToastrModule } from '@relynn/ngx-toastr';
import { CvCardComponent } from './cv-card.component';

describe('CvCardComponent', () => {
  let component: CvCardComponent;
  let fixture: ComponentFixture<CvCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvCardComponent, ToastrModule.forRoot()],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CvCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
