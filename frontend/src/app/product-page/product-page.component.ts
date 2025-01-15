import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-page',
  imports: [CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent implements OnInit {
  product: Product | null = null;
  selectedImage : String = ""

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProduct(productId).subscribe((product) => {
        this.product = product;
        this.selectedImage = this.product.image;
        product.otherImages.forEach((element) => {
          console.log(element);
        });
        console.log(this.product.otherImages);
      });
    }
  }

  selectImage(imageUrl:String) {
    this.selectedImage = imageUrl;
  }

  formatPrice(price: number): string {
    return this.productService.formatPrice(price);
  }
}
