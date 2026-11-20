import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { API } from "../../../config/api.config";

import { CvService } from "./cv.service";

describe("CvService", () => {
  let service: CvService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CvService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("sends the LoopBack name filter as a JSON HTTP parameter", () => {
    service.selectByName("se").subscribe();

    const request = httpTesting.expectOne((candidate) => candidate.url === API.cv);
    expect(request.request.method).toBe("GET");
    expect(request.request.params.get("filter")).toBe(
      JSON.stringify({ where: { name: { like: "%se%" } } }),
    );
    request.flush([]);
  });
});
