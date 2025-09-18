import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-conta',
  imports: [RouterModule],
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.scss',
})
export class ContaComponent {
  menuItems: {} = {
    dadosPessoais: true,
    enderecos: false,
    pedidos: false,
  };

  constructor(private authService: AuthService) {}

  logout() {
    console.log('logout');
    this.authService.logout();
  }
}
