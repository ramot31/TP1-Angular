import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from "@angular/core";
import { rxResource, toObservable, toSignal } from "@angular/core/rxjs-interop";
import { DefaultImagePipe } from "../pipes/default-image.pipe";
import { Cv } from "../model/cv";
import { CvService } from "../services/cv.service";
import { debounceTime, distinctUntilChanged, of } from "rxjs";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DefaultImagePipe],
})
export class AutocompleteComponent {
  private readonly cvService = inject(CvService);

  /** Valeur brute saisie dans le champ de recherche. */
  readonly searchTerm = signal("");

  /** Normalise la saisie avant le debounce et le distinct. */
  private readonly normalizedSearchTerm = computed(() =>
    this.searchTerm().trim(),
  );

  readonly debouncedSearchTerm = toSignal(
    toObservable(this.normalizedSearchTerm).pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ),
    { initialValue: "" },
  );

  /**
   * rxResource annule la requête précédente dès que ses paramètres changent.
   * Un paramètre undefined évite tout appel HTTP pour une saisie vide.
   */
  readonly cvsResource = rxResource<Cv[], string | undefined>({
    params: () => {
      const searchTerm = this.normalizedSearchTerm();
      const debouncedSearchTerm = this.debouncedSearchTerm();

      return searchTerm && searchTerm === debouncedSearchTerm
        ? searchTerm
        : undefined;
    },
    stream: ({ params: searchTerm }) =>
      searchTerm ? this.cvService.selectByName(searchTerm) : of([]),
  });

  readonly cvs = computed(() => this.cvsResource.value() ?? []);
  readonly selectedCv = this.cvService.selectedCv;
  readonly isDebouncing = computed(
    () =>
      this.normalizedSearchTerm().length > 0 &&
      this.normalizedSearchTerm() !== this.debouncedSearchTerm(),
  );
  readonly isLoading = computed(
    () => this.isDebouncing() || this.cvsResource.isLoading(),
  );
  readonly showResults = computed(
    () => this.normalizedSearchTerm().length > 0 && !this.selectedCv(),
  );

  updateSearchTerm(value: string): void {
    this.searchTerm.set(value);

    // Une nouvelle recherche ne doit pas laisser le détail d'un ancien CV.
    if (this.selectedCv()) {
      this.cvService.clearSelectedCv();
    }
  }

  selectCv(cv: Cv): void {
    this.cvService.selectCv(cv);
  }

  clearSelection(): void {
    this.cvService.clearSelectedCv();
  }
}
