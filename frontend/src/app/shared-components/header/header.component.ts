import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuOpen: boolean = false;

toggleMenu(): void {
  this.menuOpen = !this.menuOpen;
}

}
