import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { CvService } from "../services/cv.service";
import { DefaultImagePipe } from "../pipes/default-image.pipe";

@Component({
  selector: "app-master-details-cv",
  templateUrl: "./master-details-cv.component.html",
  styleUrls: ["./master-details-cv.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, DefaultImagePipe],
})
export class MasterDetailsCvComponent {
  private readonly cvService = inject(CvService);

  readonly cvs = this.cvService.cvs;
  readonly hasDetail = signal(false);

  constructor() {
    this.cvService.loadCvs();
  }
}
