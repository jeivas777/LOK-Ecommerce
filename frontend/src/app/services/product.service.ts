import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { get } from 'mongoose';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stockBySize: { [size: string]: number };
  images: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsEndpoint = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(page: number, limit: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.productsEndpoint}?page=${page}&limit=${limit}`
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsEndpoint, product);
  }

  getProduct(productId: string): Observable<Product> {
    const idEndpoint: string = this.productsEndpoint + '/' + productId;
    return this.http.get<Product>(idEndpoint);
  }

  getProductByName(
    name: string,
    page: number,
    limit: number
  ): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.productsEndpoint}?name=${name}&page=${page}&limit=${limit}`
    );
  }

  formatPrice(price: number): string {
    return 'R$ ' + price.toString().replace('.', ',');
  }
}
