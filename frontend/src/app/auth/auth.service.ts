import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  register(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.registerEndpoint, user);
  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.loginEndpoint, user);
  }
}
