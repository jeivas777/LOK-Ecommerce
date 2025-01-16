import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-content-itens',
  imports: [CommonModule, RouterModule],
  templateUrl: './content-itens.component.html',
  styleUrl: './content-itens.component.scss',
})
export class ContentItensComponent implements OnInit {
  products: Product[] = [];
  formattedPrice: string | null = null;
  currentImage: { [key: string]: string } = {};
  query: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.query = this.route.snapshot.queryParamMap.get('q');

    if (this.query) {
      this.productService.getProductByName(this.query).subscribe((response) => {
        this.products = response;
      });
    } else {
      this.productService.getProducts().subscribe((products) => {
        this.products = products;
      });
    }
  }

  formatName(name: string): string {
    return name.replace(/\s+/g, '-');
  }

  formatPrice(price: number): string {
    return this.productService.formatPrice(price);
  }

  updateCurrentImage(productId: string, newImage: string): void {
    this.currentImage[productId] = newImage;
  }
}
