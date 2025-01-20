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
    this.route.queryParamMap.subscribe((params) => {
      this.query = params.get('q'); // Obtém o valor do parâmetro 'q'

      if (this.query && this.query.trim() !== '') {
        // Caso exista uma query string válida, realiza a busca
        this.fetchProducts(this.query);
      } else {
        // Caso contrário, carrega todos os produtos
        this.fetchAllProducts();
      }
    });
  }

  fetchProducts(query: string): void {
    this.productService.getProductByName(query).subscribe((response) => {
      this.products = response; // Atualiza os produtos com os resultados da busca
      console.log('Resultados da busca:', response);
    });
  }

  fetchAllProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products; // Atualiza com todos os produtos
      console.log('Todos os produtos:', this.products);
    });
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
