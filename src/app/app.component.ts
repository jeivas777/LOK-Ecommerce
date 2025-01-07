import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared-components/header/header.component';
import { ContentItensComponent } from './home/content-itens/content-itens.component';
import { FooterComponent } from './shared-components/footer/footer.component';
import { PaginatorComponent } from './shared-components/paginator/paginator.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  imports: [HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-course';
}
