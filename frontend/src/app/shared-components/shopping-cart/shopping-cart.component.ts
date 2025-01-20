import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent implements OnInit {
  @Output() closeCart = new EventEmitter<void>();
  cartProducts: any[] = [];

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

  removeItem(product: Product): void {
    this.cartService.removeFromCart(product);
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;

    this.cartService.cartProducts$.subscribe((cartItens) => {
      cartItens.forEach((element) => {
        totalPrice += element.price;
      });
    });

    return totalPrice;
  }
}
