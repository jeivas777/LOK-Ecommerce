import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component';
import { ContentItensComponent } from './content-itens/content-itens.component';
import { ContentItemComponent } from './content-itens/content-item/content-item.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, ContentItensComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-course';
}
