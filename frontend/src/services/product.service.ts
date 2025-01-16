import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  stockBySize: { [size: string]: number };
  images: string[];
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

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsEndpoint, product);
  }

  getProduct(productId: string): Observable<Product> {
    const idEndpoint: string = this.productsEndpoint + '/' + productId;
    console.log(idEndpoint);
    return this.http.get<Product>(idEndpoint);
  }

  getProductByName(productName: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      this.productsEndpoint + '?name=' + productName
    );
  }

  formatPrice(price: number): string {
    return 'R$ ' + price.toString().replace('.', ',');
  }
}
