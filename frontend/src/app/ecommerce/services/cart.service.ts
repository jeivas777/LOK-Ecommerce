import { Injectable } from '@angular/core';
import { response } from 'express';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

export interface CartProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stockBySize: { [size: string]: number };
  images: string[];
  selectedSize: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProductsSubject = new BehaviorSubject<CartProduct[]>([]);
  cartProducts$ = this.cartProductsSubject.asObservable();

  constructor() {}

  addToCart(product: Product, selectedSize: string, quantity: number): void {
    const currentCart = this.cartProductsSubject.value;

    const productToUpdate = currentCart.find(
      (cartProduct) =>
        cartProduct.id == product.id && cartProduct.selectedSize == selectedSize
    );

    if (productToUpdate) {
      productToUpdate.quantity = quantity;

      this.cartProductsSubject.next(currentCart);
    } else {
      const productCopy: CartProduct = {
        ...product,
        price:
          typeof product.price === 'string'
            ? parseFloat(product.price)
            : product.price,
        selectedSize: selectedSize,
        quantity: quantity,
      };

      this.cartProductsSubject.next([...currentCart, productCopy]);
    }
  }

  removeFromCart(product: CartProduct) {
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

  decrementQuantity(product: CartProduct) {
    if (product && product.quantity > 1) {
      const currentCart = this.cartProductsSubject.value;

      const productToUpdate = currentCart.find(
        (cartProduct) =>
          cartProduct.id == product.id &&
          cartProduct.selectedSize == product.selectedSize
      );

      if (productToUpdate) productToUpdate.quantity--;
    }
  }

  incrementQuantity(product: CartProduct) {
    if (product) {
      const currentCart = this.cartProductsSubject.value;

      const productToUpdate = currentCart.find(
        (cartProduct) =>
          cartProduct.id == product.id &&
          cartProduct.selectedSize == product.selectedSize
      );

      if (productToUpdate) productToUpdate.quantity++;
    }
  }
}
