import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

const DEFAULT_PRICE = 0;
const DEFAULT_QUANTITY = 1;
const DEFAULT_TVA = 18;

@Component({
  selector: 'app-ttc',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './ttc.component.html',
  styleUrl: './ttc.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TtcComponent {
  readonly price = signal(DEFAULT_PRICE);
  readonly quantity = signal(DEFAULT_QUANTITY);
  readonly tva = signal(DEFAULT_TVA);

  readonly discountRate = computed(() => {
    const quantity = this.quantity();
    if (quantity > 15) {
      return 0.3;
    }
    if (quantity > 10) {
      return 0.2;
    }
    return 0;
  });

  readonly unitPriceTtc = computed(
    () => this.price() * (1 + this.tva() / 100),
  );

  readonly totalBeforeDiscount = computed(
    () => this.unitPriceTtc() * this.quantity(),
  );

  readonly discount = computed(
    () => this.totalBeforeDiscount() * this.discountRate(),
  );

  readonly totalTtc = computed(
    () => this.totalBeforeDiscount() - this.discount(),
  );
}
