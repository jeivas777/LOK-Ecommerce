import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../../product.service';

@Component({
  selector: 'app-content-item',
  imports: [RouterModule],
  templateUrl: './content-item.component.html',
  styleUrl: './content-item.component.scss',
})
export class ContentItemComponent {
  @Input() product!: Product;
}
