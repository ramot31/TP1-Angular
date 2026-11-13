import { Component, computed, linkedSignal, signal } from '@angular/core';
import { countries } from '../data/countries';
import { Country } from '../model/country.interface';

@Component({
  selector: 'app-country-currency-selector',
  standalone: true,
  imports: [],
  templateUrl: './country-currency-selector.component.html',
  styleUrl: './country-currency-selector.component.css',
})
export class CountryCurrencySelectorComponent {
  // Liste complète des pays
  countries = countries;

  // Signal pour le pays actuellement sélectionné, initialisé avec le premier pays
  selectedCountry = signal<Country>(this.countries[0]);

  // Signal calculé en lecture seule retournant les devises acceptées du pays sélectionné
  availableCurrencies = computed(() => this.selectedCountry().acceptedCurrencies);

  // linkedSignal synchronisé avec selectedCountry :
  // Si l'ancienne devise (previous?.value) est supportée par le nouveau pays, on la garde ;
  // sinon, on prend la première devise acceptée du nouveau pays.
  selectedCurrency = linkedSignal<Country, string>({
    source: () => this.selectedCountry(),
    computation: (newCountry, previous) => {
      const prevCurrency = previous?.value;
      if (prevCurrency && newCountry.acceptedCurrencies.includes(prevCurrency)) {
        return prevCurrency;
      }
      return newCountry.acceptedCurrencies[0];
    },
  });

  // Met à jour selectedCountry lors du changement dans le premier select
  onCountryChange(countryName: string): void {
    const found = this.countries.find((c) => c.name === countryName);
    if (found) {
      this.selectedCountry.set(found);
    }
  }
}
