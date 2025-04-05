import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ContentItensComponent } from '../../components/content-itens/content-itens.component';

@Component({
  selector: 'app-home',
  imports: [ContentItensComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
