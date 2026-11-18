import { Component } from "@angular/core";
import {
  Observable,
  Subject,
  concatMap,
  map,
  scan,
  startWith,
  takeWhile,
} from "rxjs";
import { Product } from "./dto/product.dto";
import { ProductService } from "./services/product.service";
import { Settings } from "./dto/product-settings.dto";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent {
  private readonly limit = 12;
  private loadMore$ = new Subject<void>();
  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {
    this.products$ = this.loadMore$.pipe(
      startWith(undefined),
      scan((skip) => skip + this.limit, -this.limit),
      map((skip): Settings => ({ limit: this.limit, skip })),
      concatMap((settings) => this.productService.getProducts(settings)),
      takeWhile((res) => res.skip + res.limit < res.total, true),
      map((res) => res.products),
      scan((acc, products) => [...acc, ...products], [] as Product[])
    );
  }

  loadMore() {
    this.loadMore$.next();
  }
}