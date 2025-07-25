import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface EnderecoResponse {}

@Injectable({
  providedIn: 'root',
})
export class EnderecosService {
  private enderecosEndpoint = `${environment.apiUrl}/enderecos/buscar/`;

  constructor(private http: HttpClient) {}

  getProducts(userId: number): Observable<EnderecoResponse> {
    return this.http.get<EnderecoResponse>(
      `${this.enderecosEndpoint}${userId}`
    );
  }
}
