import { Component, OnInit } from '@angular/core';
import { ContentItemComponent } from './content-item/content-item.component';
import { ProductService, Product } from '../../product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-itens',
  imports: [ContentItemComponent, CommonModule],
  templateUrl: './content-itens.component.html',
  styleUrl: './content-itens.component.scss',
})
export class ContentItensComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
