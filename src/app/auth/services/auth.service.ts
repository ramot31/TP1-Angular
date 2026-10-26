import { computed, Injectable, inject, signal } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { AuthenticatedUser } from '../dto/authenticated-user.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const AUTH_SESSION_STORAGE_KEY = 'authenticated-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  #user = signal<AuthenticatedUser | null>(null);


  readonly user = this.#user.asReadonly();

  readonly isAuthenticated = computed(() => this.#user() !== null);

  readonly token = computed(() => this.#user()?.token ?? null);

  constructor() {
    this.restoreSession();
  }

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((response) =>
        this.startSession({
          id: response.userId,
          email: credentials.email,
          token: response.id,
        })
      )
    );
  }

  logout(): void {
    this.#user.set(null);
    localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    localStorage.removeItem('token');
  }

  private startSession(user: AuthenticatedUser): void {
    this.#user.set(user);
    localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(user));
    localStorage.removeItem('token');
  }

  private restoreSession(): void {
    const storedSession = localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
    if (!storedSession) {
      return;
    }

    try {
      const session: unknown = JSON.parse(storedSession);
      if (this.isValidSession(session)) {
        this.#user.set(session);
        return;
      }
    } catch {
    }

    localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
  }

  private isValidSession(session: unknown): session is AuthenticatedUser {
    if (!session || typeof session !== 'object') {
      return false;
    }

    const candidate = session as AuthenticatedUser;
    return (
      typeof candidate.id === 'number' &&
      typeof candidate.email === 'string' &&
      candidate.email.length > 0 &&
      typeof candidate.token === 'string' &&
      candidate.token.length > 0
    );
  }
}
