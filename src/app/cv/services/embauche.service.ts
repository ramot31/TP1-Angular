import { Injectable, signal } from '@angular/core';
import { Cv } from '../model/cv';

@Injectable({
  providedIn: 'root',
})
export class EmbaucheService {
  /**
   * La liste des cvs pré embauchés (modifiable uniquement dans ce service)
   */
  #embauchees = signal<Cv[]>([]);

  /**
   * La liste des cvs pré embauchés en lecture seule pour les composants
   */
  embauchees = this.#embauchees.asReadonly();

  /**
   * Indique si le cv est déjà pré embauché (comparaison par id)
   *
   * @param cv : Cv
   * @returns boolean
   */
  isEmbauche(cv: Cv): boolean {
    return this.#embauchees().some((e) => e.id === cv.id);
  }

  /**
   *
   * Embauche une personne si elle ne l'est pas encore
   * Sinon il retourne false
   *
   * @param cv : Cv
   * @returns boolean
   */
  embauche(cv: Cv): boolean {
    if (this.isEmbauche(cv)) {
      return false;
    }
    this.#embauchees.update((liste) => [...liste, cv]);
    return true;
  }
}
