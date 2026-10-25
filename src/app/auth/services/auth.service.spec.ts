import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { API } from '../../../config/api.config';

describe('AuthService', () => {
  let service: AuthService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should persist and expose a session after login', () => {
    service.login({ email: 'student@example.com', password: 'password' }).subscribe();

    const request = httpTesting.expectOne(API.login);
    expect(request.request.method).toBe('POST');
    request.flush({
      id: 'access-token',
      ttl: 3600,
      created: new Date(),
      userId: 42,
    });

    expect(service.user()).toEqual({
      id: 42,
      email: 'student@example.com',
      token: 'access-token',
    });
    expect(service.isAuthenticated()).toBeTrue();
    expect(service.token()).toBe('access-token');
    expect(JSON.parse(localStorage.getItem('authenticated-user') ?? '')).toEqual(
      service.user()
    );
  });

  it('should clear the in-memory and persisted session on logout', () => {
    localStorage.setItem(
      'authenticated-user',
      JSON.stringify({ id: 42, email: 'student@example.com', token: 'access-token' })
    );
    const restoredService = TestBed.runInInjectionContext(() => new AuthService());

    expect(restoredService.isAuthenticated()).toBeTrue();
    restoredService.logout();

    expect(restoredService.user()).toBeNull();
    expect(restoredService.isAuthenticated()).toBeFalse();
    expect(localStorage.getItem('authenticated-user')).toBeNull();
  });
});
