import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuOpen: boolean = false;
  showSearchBar: boolean = false;
  query: string | null = null;

  @Output() searchTermChanged = new EventEmitter<string>();

  constructor(
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  toggleSearchBar(): void {
    this.showSearchBar = !this.showSearchBar;
  }

  onSubmit(form: any): void {
    // Adicionar lógica para atualizar a variável de produtos do componente content ao enviar o formulário
    // Redireciona para a nova rota
    this.router.navigate(['/search'], {
      queryParams: { q: form.value.search },
    });
  }
}
