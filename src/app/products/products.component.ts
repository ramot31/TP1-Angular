import { Component } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  concatMap,
  map,
  takeWhile,
  scan,
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
  /* Todo : Faire le nécessaire pour créer le flux des produits à afficher */
  /* Tips : vous pouvez voir les différents imports non utilisés et vous en inspirer */
 private settings$ = new BehaviorSubject<Settings>({ limit: 12, skip: 0 });
  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {
    this.products$ = this.settings$.pipe(
      concatMap((settings) => this.productService.getProducts(settings)),
      takeWhile((res) => res.skip + res.limit < res.total, true),
      map((res) => res.products),
      scan((acc, products) => [...acc, ...products], [] as Product[])
    );
  }

  loadMore() {
    const current = this.settings$.value;
    this.settings$.next({ ...current, skip: current.skip + current.limit });
  }
}