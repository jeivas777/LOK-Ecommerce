import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerEndpoint = `${environment.apiUrl}/register`;
  private loginEndpoint = `${environment.apiUrl}/login`;

  constructor(private http: HttpClient) {}

  register(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.registerEndpoint, user);
  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.loginEndpoint, user);
  }
}
