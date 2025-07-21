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
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerEndpoint = `${environment.apiUrl}/auth/register`;
  private loginEndpoint = `${environment.apiUrl}/auth/login`;

  constructor(private http: HttpClient, private router: Router) {}

  register(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.registerEndpoint, user);
  }

  login(email: string, senha: string): Observable<{ token: string }> {
    const user = { email, senha };
    return this.http.post<{ token: string }>(this.loginEndpoint, user).pipe(
      tap((res: any) => {
        localStorage.setItem('auth_token', res.token);
      })
    );
  }
}
