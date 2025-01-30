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
  availableSizes: string[] | null = null;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProduct(productId).subscribe((res) => {
        this.product = res;

        for (const [key, value] of Object.entries(this.product.stockBySize)) {
          if (value > 0) {
            if (this.availableSizes)
              this.availableSizes = [...this.availableSizes, key];
            else this.availableSizes = [key];
          }
        }
        if (this.product.images && !this.selectedImage)
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

  addToCart(selectedSize: string | null): void {
    if (selectedSize && this.product) {
      this.cartService.addToCart(this.product, selectedSize, this.quantity);
    }
  }

  incrementQuantity() {
    if (
      this.selectedSize &&
      this.product &&
      this.quantity < 10 &&
      this.product.stockBySize[this.selectedSize] > this.quantity
    )
      this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  onChange(select: any) {
    if (
      this.product &&
      this.selectedSize &&
      this.quantity > this.product.stockBySize[this.selectedSize]
    )
      this.quantity = this.product.stockBySize[this.selectedSize];
  }
}
