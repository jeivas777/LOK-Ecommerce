import { Component } from '@angular/core';
import { ContentItensComponent } from '../content-itens/content-itens.component';

@Component({
  selector: 'app-search-results',
  imports: [ContentItensComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {}
