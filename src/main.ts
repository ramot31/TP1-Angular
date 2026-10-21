import { isDevMode, importProvidersFrom } from "@angular/core";


import { AuthInterceptorProvider } from "./app/auth/interceptors/auth.interceptor";
import { provideHttpClient, withXhr, withInterceptorsFromDi } from "@angular/common/http";
import { bootstrapApplication } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "@relynn/ngx-toastr";
import { provideRouter } from "@angular/router";
import { routes } from "./app/app.routes";
import { ServiceWorkerModule } from "@angular/service-worker";
import { AppComponent } from "./app/app.component";


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(FormsModule, BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot(), // ToastrModule added
        ReactiveFormsModule, ServiceWorkerModule.register("ngsw-worker.js", {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: "registerWhenStable:30000",
        })),
        provideRouter(routes),
        AuthInterceptorProvider,
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
    ]
})
  .catch(err => console.error(err));
