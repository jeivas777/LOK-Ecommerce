import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent implements OnInit {
  product: Product | null = null;
  selectedImage: string = '';
  selectedSize: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProduct(productId).subscribe((product) => {
        this.product = product;
        this.selectedImage = this.product.images[0];
      });
    }
  }

  selectImage(imageUrl: string) {
    this.selectedImage = imageUrl;
  }

  formatPrice(price: number): string {
    return this.productService.formatPrice(price);
  }

  addToCart(selectedSize: String | null): void {
    if (selectedSize) this.cartService.addToCart(this.product, selectedSize);
  }
}
