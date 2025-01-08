import { Component } from '@angular/core';
import { HeaderComponent } from '../shared-components/header/header.component';
import { PaginatorComponent } from '../shared-components/paginator/paginator.component';
import { FooterComponent } from '../shared-components/footer/footer.component';
import { ContentItensComponent } from './content-itens/content-itens.component';

@Component({
  selector: 'app-home',
  imports: [ContentItensComponent, PaginatorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
