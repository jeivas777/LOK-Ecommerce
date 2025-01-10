import { Component } from '@angular/core';
import { ContentItemComponent } from './content-item/content-item.component';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-content-itens',
  imports: [ContentItemComponent],
  templateUrl: './content-itens.component.html',
  styleUrl: './content-itens.component.scss',
})
export class ContentItensComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
