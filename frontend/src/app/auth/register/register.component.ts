import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ErrorMessageComponent } from '../../ecommerce/components/error-message/error-message.component';
import { AuthService, User } from '../auth.service';

// validators
import { CpfValidatorDirective } from '../../validators/cpf.directive';
import { EmailValidatorDirective } from '../../validators/email.directive';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    ErrorMessageComponent,
    CpfValidatorDirective,
    EmailValidatorDirective,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  cpf: string = '';
  nome: string = '';
  email: string = '';
  senha: string = '';
  telefone: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit(form: NgForm) {
    this.loading = true;
    const user: User = {
      cpf: this.cpf,
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      telefone: this.telefone,
      id: 0,
    };

    if (!form.valid) {
      this.markAllFieldsAsTouched(form);
      return;
    }

    this.authService.register(user).subscribe({
      next: (res) => {
        this.toastr.success('Cadastro realizado com sucesso!', 'Bem-vindo(a)!');

        setTimeout(() => {
          this.router.navigate(['/account/login']);
          this.loading = false;
        }, 1000);
      },
      error: (err) => {
        this.toastr.error(
          'Não foi possível realizar o cadastro. Tente novamente.',
          'Erro!'
        );

        console.error('Falha no cadastro', err);
      },
    });
  }

  markAllFieldsAsTouched(form: NgForm) {
    Object.values(form.controls).forEach((control) => {
      control.markAsTouched(); // Marca os campos como tocados
    });
  }
}
