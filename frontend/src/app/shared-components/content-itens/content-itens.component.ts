import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-content-itens',
  imports: [CommonModule, RouterModule],
  templateUrl: './content-itens.component.html',
  styleUrl: './content-itens.component.scss',
})
export class ContentItensComponent implements OnInit {
  products$: Observable<Product[]> = new Observable();
  formattedPrice: string | null = null;
  currentImage: { [key: string]: string } = {};
  query: string | null = null;

  page: number = 1;
  limit: number = 10;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.query = params.get('q'); // Obtém o valor do parâmetro 'q'

      if (this.query && this.query.trim() !== '') {
        // Caso exista uma query string válida, realiza a busca
        this.fetchProducts(this.query, this.page, this.limit);
      } else {
        // Caso contrário, carrega todos os produtos
        this.fetchAllProducts(this.page, this.limit);
      }
    });
  }

  fetchProducts(query: string, page: number, limit: number): void {
    this.products$ = this.productService.getProductByName(query, page, limit);
  }

  fetchAllProducts(page: number, limit: number): void {
    this.products$ = this.productService.getProducts(page, limit); // Carrega todos os produtos caso a pesquisa esteja vazia
  }

  formatName(name: string): string {
    return name.replace(/\s+/g, '-');
  }

  formatPrice(price: number): string {
    return this.productService.formatPrice(price);
  }

  updateCurrentImage(productId: number, newImage: string): void {
    this.currentImage[productId] = newImage;
  }
}
