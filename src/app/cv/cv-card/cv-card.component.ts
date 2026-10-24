import { Component, ChangeDetectionStrategy, inject, input, computed } from '@angular/core';
import { Cv } from '../model/cv';
import { EmbaucheService } from '../services/embauche.service';
import { ToastrService } from '@relynn/ngx-toastr';
import { RouterLink } from '@angular/router';
import { DefaultImagePipe } from '../pipes/default-image.pipe';

@Component({
    selector: 'app-cv-card',
    templateUrl: './cv-card.component.html',
    styleUrls: ['./cv-card.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, DefaultImagePipe]
})
export class CvCardComponent {
  private embaucheService = inject(EmbaucheService);
  private toastr = inject(ToastrService);

  readonly cv = input<Cv | null>(null);

  /**
   * true si le cv affiché est déjà pré embauché
   */
  readonly isEmbauche = computed(() => {
    const cv = this.cv();
    if (!cv) {
      return false;
    }
    return this.embaucheService.isEmbauche(cv);
  });

  embaucher() {
    const cv = this.cv();
    if (!cv) {
      return;
    }
    if (this.embaucheService.embauche(cv)) {
      this.toastr.success(`${cv.firstname} ${cv.name} a été pré embauché`);
    } else {
      this.toastr.warning(`${cv.firstname} ${cv.name} est déjà pré embauché`);
    }
  }
}
