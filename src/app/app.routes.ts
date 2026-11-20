import { Routes } from "@angular/router";
import { FrontComponent } from "./templates/front/front.component";
import { NF404Component } from "./components/nf404/nf404.component";

export const routes: Routes = [
  {
    path: "login",
    loadComponent: () =>
      import("./auth/login/login.component").then((m) => m.LoginComponent),
    data: { preload: true },
  },
  {
    path: "rh",
    loadComponent: () =>
      import("./optimizationPattern/rh/rh.component").then((m) => m.RhComponent),
  },
  {
    path: "rainbow",
    loadComponent: () =>
      import("./components/rainbow-input/rainbow-input.component").then(
        (m) => m.RainbowInputComponent,
      ),
  },
  {
    path: "ttc",
    loadComponent: () =>
      import("./components/ttc/ttc.component").then((m) => m.TtcComponent),
  },
  {
    path: "tp2/currency",
    loadComponent: () =>
      import("./tp2/currency-selector/country-currency-selector.component").then(
        (m) => m.CountryCurrencySelectorComponent,
      ),
  },
  {
    path: "tp2/filter",
    loadComponent: () =>
      import("./tp2/products-filter/products-filter.component").then(
        (m) => m.ProductsFilterComponent,
      ),
  },
  {
    path: "tp2/autocomplete",
    loadComponent: () =>
      import("./cv/autocomplete/autocomplete.component").then(
        (m) => m.AutocompleteComponent,
      ),
  },
  {
    path: "cv",
    loadChildren: () => import("./cv/cv.routes").then((m) => m.CV_ROUTES),
    data: { preload: true },
  },
  {
    path: "",
    component: FrontComponent,
    children: [
      {
        path: "todo",
        loadComponent: () =>
          import("./todo/todo/todo.component").then((m) => m.TodoComponent),
      },
      {
        path: "word",
        loadComponent: () =>
          import("./directives/mini-word/mini-word.component").then(
            (m) => m.MiniWordComponent,
          ),
      },
    ],
  },
  {
    path: "admin",
    loadComponent: () =>
      import("./templates/admin/admin.component").then((m) => m.AdminComponent),
    children: [
      {
        path: "color",
        loadComponent: () =>
          import("./components/color/color.component").then(
            (m) => m.ColorComponent,
          ),
      },
    ],
  },
  { path: "**", component: NF404Component },
];
