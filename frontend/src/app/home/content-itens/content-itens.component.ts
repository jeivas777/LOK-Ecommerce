import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-content-itens',
  imports: [CommonModule, RouterModule],
  templateUrl: './content-itens.component.html',
  styleUrl: './content-itens.component.scss',
})
export class ContentItensComponent implements OnInit {
  products: Product[] = [];
  formattedPrice : string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  formatName(name: string):string {
    return name.replace(/\s+/g, "-")
  }

  formatPrice(price:number):string {
    return this.productService.formatPrice(price);
  }
}
