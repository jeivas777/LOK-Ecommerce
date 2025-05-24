import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartProduct, CartService } from '../../services/cart.service';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent implements OnInit {
  @Output() closeCart = new EventEmitter<void>();
  cartProducts: CartProduct[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartProducts$.subscribe((response) => {
      this.cartProducts = response;
    });
  }

  close() {
    this.closeCart.emit(); // Notifica o pai para fechar o carrinho
  }

  formatPrice(price: number): string {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  }

  removeItem(product: CartProduct): void {
    this.cartService.removeFromCart(product);
  }

  calculateTotalPrice(): number {
    return this.cartProducts.reduce((acc, item) => {
      const price =
        typeof item.price === 'string' ? parseFloat(item.price) : item.price;
      return acc + (isNaN(price) ? 0 : price * item.quantity);
    }, 0);
  }

  decrementQuantity(product: CartProduct) {
    this.cartService.decrementQuantity(product);
  }

  incrementQuantity(product: CartProduct) {
    this.cartService.incrementQuantity(product);
  }
}
