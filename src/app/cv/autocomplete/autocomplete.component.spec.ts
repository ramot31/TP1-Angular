import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { API } from "../../../config/api.config";
import { Cv } from "../model/cv";

import { AutocompleteComponent } from "./autocomplete.component";

describe("AutocompleteComponent", () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;
  let httpTesting: HttpTestingController;

  const cv = new Cv(1, "Sami", "Sellami", "Developer", "as.jpg", "1234", 25);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AutocompleteComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("does not call the API for an empty or whitespace-only search", fakeAsync(() => {
    component.updateSearchTerm("   ");
    tick(300);

    httpTesting.expectNone((request) => request.url === API.cv);
  }));

  it("debounces, normalizes and serializes a name search", fakeAsync(() => {
    component.updateSearchTerm("  se  ");
    tick(299);
    httpTesting.expectNone((request) => request.url === API.cv);

    tick(1);
    const request = httpTesting.expectOne((candidate) => candidate.url === API.cv);
    expect(request.request.method).toBe("GET");
    expect(request.request.params.get("filter")).toBe(
      JSON.stringify({ where: { name: { like: "%se%" } } }),
    );

    request.flush([cv]);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain("Sami Sellami");

    component.updateSearchTerm("se");
    tick(300);
    httpTesting.expectNone((candidate) => candidate.url === API.cv);
  }));

  it("shows the selected CV and clears it when a new search starts", () => {
    component.selectCv(cv);
    fixture.detectChanges();
    expect(component.selectedCv()).toEqual(cv);
    expect(fixture.nativeElement.textContent).toContain("Developer");

    component.updateSearchTerm("sa");
    expect(component.selectedCv()).toBeNull();
  });
});
