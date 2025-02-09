import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

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
  totalItems: number = 0;
  totalPages: number = 1;
  maxPagesToShow: number = 5; // Number of pages to display at a time

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTotalProducts();

    this.route.queryParamMap.subscribe((params) => {
      this.query = params.get('q'); // Obtém o valor do parâmetro 'q'

      const page = params.get('page');

      if (page) {
        this.page = +page;
      }

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
    this.products$ = this.productService
      .getProductByName(query, page, limit)
      .pipe(
        map((response) => response.products) // Aqui estamos extraindo a propriedade `products`
      );

    this.productService
      .getProductByName(query, page, limit)
      .subscribe((res) => {
        this.totalPages = Math.ceil(this.totalItems / limit); // Calculate total pages
      });
  }

  fetchAllProducts(page: number, limit: number): void {
    this.products$ = this.productService.getProducts(page, limit).pipe(
      map((response) => response.products) // Aqui estamos extraindo a propriedade `products`
    );

    this.productService.getProducts(page, limit).subscribe((res) => {
      this.totalPages = Math.ceil(this.totalItems / limit); // Calculate total pages
    });
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

  getTotalProducts(): void {
    this.productService.getProducts(this.page, this.limit).subscribe((res) => {
      this.totalItems = res.totalItems;
    });
  }

  getPages(): number[] {
    const half = Math.floor(this.maxPagesToShow / 2);
    let start = Math.max(1, this.page - half);
    let end = Math.min(this.totalPages, start + this.maxPagesToShow - 1);

    // Adjust when close to the start or end
    if (end - start < this.maxPagesToShow - 1) {
      start = Math.max(1, end - this.maxPagesToShow + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  changePage(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages) {
      return;
    }
    this.router.navigate([], {
      queryParams: { page: newPage },
      queryParamsHandling: 'merge',
    });
  }
}
