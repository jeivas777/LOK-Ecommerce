import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Product {
  _id: String;
  name: String;
  description: String;
  price: Number;
  image: String;
  category: String;
  stock: Number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsEndpoint = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsEndpoint);
  }
}
