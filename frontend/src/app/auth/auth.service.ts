import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: number;
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  telefone: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseEndpoint = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private router: Router) {}

  register(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.baseEndpoint}/auth/register`,
      user
    );
  }

  login(email: string, senha: string): Observable<{ token: string }> {
    const user = { email, senha };
    return this.http
      .post<{ token: string }>(`${this.baseEndpoint}/auth/login`, user)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('auth_token', res.token);
        })
      );
  }

  edit(newUser: User): Observable<User> {
    return this.http.put<User>(`${this.baseEndpoint}/user/me`, newUser);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.baseEndpoint}/user/me`);
  }

  logout(): void {
    console.log('logout');
    localStorage.removeItem('auth_token');
    this.router.navigate(['/account/login']);
  }
}
