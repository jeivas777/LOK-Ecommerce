import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-content-itens',
  imports: [CommonModule, RouterModule],
  templateUrl: './content-itens.component.html',
  styleUrl: './content-itens.component.scss',
})
export class ContentItensComponent implements OnInit {
  products$: Observable<Product[]> = new Observable();
  isLoading = true;
  formattedPrice: string | null = null;
  currentImage: { [key: string]: string } = {};
  query: string | null = null;
  skeletonArray = new Array(6); // Simula 6 itens em loading

  page: number = 1;
  limit: number = 8;
  totalItems: number = 0;
  totalPages: number = 0;
  pages: number[] = [];
  maxPagesToShow: number = 5; // Number of pages to display at a time

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.query = params.get('q'); // Obtém o valor do parâmetro 'q'

      const page = params.get('page');

      if (page) {
        this.page = +page;
      }

      if (this.query && this.query.trim() !== '') {
        // Caso exista uma query string válida, realiza a busca
        this.fetchProducts(this.page, this.limit, this.query);
      } else {
        // Caso contrário, carrega todos os produtos
        this.fetchProducts(this.page, this.limit);
      }
    });
  }

  fetchProducts(page: number, limit: number, query: string = ''): void {
    this.products$ = this.productService.getProducts(page, limit, query).pipe(
      tap((res) => {
        this.totalPages = Math.ceil(res.totalItems / this.limit); // Calculate total pages
        this.pages = this.getPages();
        this.totalItems = res.totalItems;
      }),
      map((res) => res.products) // Aqui estamos extraindo a propriedade `products`
    );

    this.products$.subscribe((res) => {
      this.isLoading = false;
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

  getPages(): number[] {
    const pages: number[] = [];
    const startPage = Math.max(
      1,
      this.page - Math.floor(this.maxPagesToShow / 2)
    );
    const endPage = Math.min(
      this.totalPages,
      startPage + this.maxPagesToShow - 1
    );

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
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

  getImageBase(product: any): string {
    return this.currentImage[product.id] || product.images?.[0] || '';
  }
}
