import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { PRODUCTS, ProductCategory } from './product.data';

@Component({
  selector: 'app-products-filter',
  imports: [],
  standalone: true,
  templateUrl: './products-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './products-filter.component.css',
})
export class ProductsFilterComponent {
  // A. Liste originale stockée dans un Signal
  products = signal<ProductCategory[]>(PRODUCTS);

  // B. Catégories uniques dynamiques avec 'All' en première option
  categories = computed(() => [
    'All',
    ...Array.from(new Set(this.products().map((p) => p.category))),
  ]);

  // C. Filtres modifiables indépendants (Writable Signals)
  searchQuery = signal<string>('');
  selectedCategory = signal<string>('All');

  // D. Filtrage combiné réactif (Computed Signal)
  filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategory();

    return this.products().filter((product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesQuery = product.name.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  });

  // E. Réinitialisation des filtres
  reset(): void {
    this.searchQuery.set('');
    this.selectedCategory.set('All');
  }
}
