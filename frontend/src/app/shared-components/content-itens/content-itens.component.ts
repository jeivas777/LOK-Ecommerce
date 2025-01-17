import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchService } from '../../services/search.service';

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
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.query = this.route.snapshot.queryParamMap.get('q');

    this.searchService.searchQuery$.subscribe((query) => {
      this.query = query;
      this.fetchProducts(); // Atualiza os produtos quando a pesquisa muda
    });
  }

  fetchProducts(): void {
    if (this.query && this.query.trim() !== '') {
      this.productService.getProductByName(this.query).subscribe((response) => {
        this.products = response; // Atualiza os produtos filtrados
      });
    } else {
      this.productService.getProducts().subscribe((products) => {
        this.products = products; // Carrega todos os produtos caso a pesquisa esteja vazia
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
