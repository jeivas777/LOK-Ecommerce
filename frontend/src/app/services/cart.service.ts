import { Injectable } from '@angular/core';
import { response } from 'express';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProductsSubject = new BehaviorSubject<any[]>([]);
  cartProducts$ = this.cartProductsSubject.asObservable();

  constructor() {}

  addToCart(product: any, selectedSize: String): void {
    const currentCart = this.cartProductsSubject.value;

    const productCopy = {
      ...product,
      selectedSize: selectedSize,
    };

    this.cartProductsSubject.next([...currentCart, productCopy]);

    this.cartProducts$.subscribe((response) => {
      response.forEach((item, i) => {
        item['cartId'] = i;
      });
    });
  }

  removeFromCart(product: any) {
    const currentCart = this.cartProductsSubject.value;

    const updatedCart = currentCart.filter(
      (cartProduct) =>
        cartProduct.cartId !== cartProduct.cartId ||
        cartProduct.selectedSize !== product.selectedSize
    );

    this.cartProductsSubject.next(updatedCart);
  }

  getCartProducts(): any {
    return this.cartProductsSubject.value;
  }
}
