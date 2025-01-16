import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, ShoppingCartComponent, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuOpen: boolean = false;
  showSearchBar: boolean = false;
  showCart: boolean = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  toggleSearchBar(): void {
    this.showSearchBar = !this.showSearchBar;
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
  }
}
