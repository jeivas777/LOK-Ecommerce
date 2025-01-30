import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, ShoppingCartComponent, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuOpen: boolean = false;
  showSearchBar: boolean = false;
  showCart: boolean = false;
  cartProductsQnt: number = 0;

  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.cartService.cartProducts$.subscribe((response) => {
      this.cartProductsQnt = response.length;
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  toggleSearchBar(): void {
    this.showSearchBar = !this.showSearchBar;
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
  }

  onSubmit(form: any): void {
    const query = form.value.query;
    this.router.navigate(['/search'], {
      queryParams: { q: query },
    });
  }
}
