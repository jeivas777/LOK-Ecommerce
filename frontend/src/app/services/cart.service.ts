import { Injectable } from '@angular/core';
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
  }

  removeFromCart(product: any) {
    const currentCart = this.cartProductsSubject.value;

    const updatedCart = currentCart.filter(
      (cartProduct) =>
        cartProduct.id !== product.id ||
        cartProduct.selectedSize !== product.selectedSize
    );

    this.cartProductsSubject.next(updatedCart);
  }

  getCartProducts(): any {
    return this.cartProductsSubject.value;
  }
}
