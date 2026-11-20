import { Component, inject } from "@angular/core";
import { FormBuilder, AbstractControl } from "@angular/forms";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  switchMap,
} from "rxjs";
import { CvService } from "../services/cv.service";
import { Cv } from "../model/cv";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
})
export class AutocompleteComponent {
  formBuilder = inject(FormBuilder);
  cvService = inject(CvService);
  get search(): AbstractControl {
    return this.form.get("search")!;
  }
  form = this.formBuilder.group({ search: [""] });
  showResults = true;

  private searchCache = new Map<string, Observable<Cv[]>>();

  cvs$: Observable<Cv[]> = this.search.valueChanges.pipe(
    debounceTime(300),
    map((name) => (name ?? "").trim()),
    distinctUntilChanged(),
    filter((name) => name.length > 0),
    switchMap((name) => this.searchCached(name)),
    startWith([])
  );

  selectedCv$ = this.cvService.selectCv$;

  private searchCached(name: string): Observable<Cv[]> {
    const key = name.toLowerCase();
    const cached = this.searchCache.get(key);

    if (cached) {
      return cached;
    }

    const request$ = this.cvService.selectByName(name).pipe(
      catchError(() => of([])),
      shareReplay(1)
    );

    this.searchCache.set(key, request$);
    return request$;
  }

  selectCv(cv: Cv): void {
    this.showResults = false;
    this.cvService.selectCv(cv);
  }

  onSearchInput(value: string): void {
    this.showResults = true;
    if (!value.trim()) {
      this.cvService.clearSelectedCv();
    }
  }

  closeDetails(): void {
    this.cvService.clearSelectedCv();
  }
}
