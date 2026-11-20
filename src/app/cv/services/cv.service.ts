import { Injectable, inject, signal } from "@angular/core";
import { Cv } from "../model/cv";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { API } from "../../../config/api.config";

@Injectable({
  providedIn: "root",
})
export class CvService {
  private http = inject(HttpClient);

  /** La liste fictive utilisée si le serveur ne répond pas. */
  #fakeCvs: Cv[] = [
    new Cv(1, "aymen", "sellaouti", "teacher", "as.jpg", "1234", 40),
    new Cv(2, "skander", "sellaouti", "enfant", "       ", "1234", 4),
  ];

  /** Liste interne des CV, exposée uniquement en lecture. */
  #cvs = signal<Cv[]>([]);
  cvs = this.#cvs.asReadonly();

  /** CV sélectionné, ou null lorsqu'aucun CV n'est sélectionné. */
  #selectedCv = signal<Cv | null>(null);
  selectedCv = this.#selectedCv.asReadonly();

  /** Indique que la liste affichée est une solution de secours locale. */
  #isFakeData = signal(false);
  isFakeData = this.#isFakeData.asReadonly();

  /** Charge les CV de l'API et utilise les données locales en cas d'erreur. */
  loadCvs(): void {
    this.#isFakeData.set(false);
    this.getCvs().subscribe({
      next: (cvs) => {
        this.#cvs.set(cvs);
      },
      error: () => {
        this.#cvs.set(this.#fakeCvs);
        this.#isFakeData.set(true);
      },
    });
  }

  /**
   * Ajoute un cv à la liste (après un ajout réussi sur l'API)
   *
   * @param cv : Cv
   */
  addToList(cv: Cv): void {
    this.#cvs.update((liste) => [...liste, cv]);
  }

  /**
   * Retire un cv de la liste (après une suppression réussie sur l'API)
   *
   * @param id : number
   */
  removeFromList(id: number): void {
    this.#cvs.update((liste) => liste.filter((cv) => cv.id !== id));
    if (this.#selectedCv()?.id === id) {
      this.#selectedCv.set(null);
    }
  }

  /**
   *
   * Retourne la liste des cvs de l'API
   *
   * @returns CV[]
   *
   */
  getCvs(): Observable<Cv[]> {
    return this.http.get<Cv[]>(API.cv);
  }

  /**
   *
   * supprime un cv par son id de l'API
   *
   * @param id: number
   * @returns CV[]
   *
   */
  deleteCvById(id: number): Observable<any> {
    return this.http.delete<any>(API.cv + id);
  }

  addCv(cv: Cv): Observable<Cv> {
    return this.http.post<any>(API.cv, cv);
  }

  /**
   *
   * Retourne un cv par son id de l'API
   *
   * @param id: number
   * @returns CV[]
   *
   */
  getCvById(id: number): Observable<Cv> {
    return this.http.get<Cv>(API.cv + id);
  }

  /**
   * Recherche les cvs dont le name contient la chaine name passée en paramètre
   * @param name : string
   * @returns cvs Cv[]
   */
  selectByName(name: string): Observable<Cv[]> {
    const filter = {
      where: {
        name: {
          like: `%${name}%`,
        },
      },
    };
    const params = new HttpParams().set("filter", JSON.stringify(filter));
    return this.http.get<Cv[]>(API.cv, { params });
  }
  /**
   * Recherche les cvs dont la valeur est égale à la chaine passée en paramètre
   * @param property : string, la propriété sur laquelle on va requeter
   * @param value : string, la valeur de la propriété sur laquelle on va requeter
   * @returns cvs Cv[]
   */
  selectByProperty(property: string, value: string) {
    const search = `{"where":{"${property}":"${value}"}}`;
    const params = new HttpParams().set("filter", search);
    return this.http.get<Cv[]>(API.cv, { params });
  }

  /**
   * Change le cv sélectionné
   *
   * @param cv : Le cv sélectionné
   */
  selectCv(cv: Cv): void {
    this.#selectedCv.set(cv);
  }

  clearSelectedCv(): void {
    this.#selectedCv.set(null);
  }
}
