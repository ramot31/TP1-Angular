import { Component, OnInit } from '@angular/core';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_ROUTES } from '../../../config/routes.config';
import { AuthService } from '../../auth/services/auth.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-details-cv',
  templateUrl: './details-cv.component.html',
  styleUrls: ['./details-cv.component.css'],
})
export class DetailsCvComponent implements OnInit {
  cv$!: Observable<Cv>;

  constructor(
    private cvService: CvService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cv$ = this.activatedRoute.params.pipe(
      switchMap((params) => this.cvService.getCvById(+params['id'])),
      catchError(() => {
        this.toastr.error(`CV introuvable ou problème serveur.`);
        this.router.navigate([APP_ROUTES.cv]);
        return EMPTY;
      })
    );
  }

  deleteCv(cv: Cv): void {
    this.cvService.deleteCvById(cv.id).pipe(
      catchError(() => {
        this.toastr.error(`Problème avec le serveur veuillez contacter l'admin`);
        return EMPTY;
      })
    ).subscribe(() => {
      this.toastr.success(`${cv.name} supprimé avec succès`);
      this.router.navigate([APP_ROUTES.cv]);
    });
  }
}
