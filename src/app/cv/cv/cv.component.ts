import { Component, ChangeDetectionStrategy, inject, effect, untracked } from "@angular/core";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "@relynn/ngx-toastr";
import { CvService } from "../services/cv.service";
import { ListComponent } from "../list/list.component";
import { CvCardComponent } from "../cv-card/cv-card.component";
import { EmbaucheComponent } from "../embauche/embauche.component";
import { UpperCasePipe, DatePipe } from "@angular/common";
@Component({
    selector: "app-cv",
    templateUrl: "./cv.component.html",
    styleUrls: ["./cv.component.css"],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ListComponent, CvCardComponent, EmbaucheComponent, UpperCasePipe, DatePipe]
})
export class CvComponent {
  private logger = inject(LoggerService);
  private toastr = inject(ToastrService);
  private cvService = inject(CvService);

  cvs = this.cvService.cvs;
  selectedCv = this.cvService.selectedCv;
  date = new Date();

  constructor() {
    this.cvService.loadCvs();
    // effet de bord : afficher un toast quand les données deviennent fictives
    effect(() => {
      if (this.cvService.isFakeData()) {
        untracked(() =>
          this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`)
        );
      }
    });
    this.logger.logger("je suis le cvComponent");
    this.toastr.info("Bienvenu dans notre CvTech");
  }
}
