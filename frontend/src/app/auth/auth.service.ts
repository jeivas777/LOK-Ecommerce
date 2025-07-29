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
  private baseEndpoint = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  register(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.baseEndpoint}/register`,
      user
    );
  }

  login(email: string, senha: string): Observable<{ token: string }> {
    const user = { email, senha };
    return this.http
      .post<{ token: string }>(`${this.baseEndpoint}/login`, user)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('auth_token', res.token);
        })
      );
  }

  update(id: number, newUser: User): Observable<User> {
    return this.http.put<User>(`${this.baseEndpoint}/update/${id}`, newUser);
  }
}
