import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ErrorMessageComponent } from '../../ecommerce/components/error-message/error-message.component';
import { AuthService, User } from '../auth.service';

// validators
import { CpfValidatorDirective } from '../../validators/cpf.directive';
import { EmailValidatorDirective } from '../../validators/email.directive';

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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    const user: User = {
      cpf: this.cpf,
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      id: 0,
    };
    if (form.valid) {
      this.authService.register(user).subscribe((res) => {
        console.log('Usuário registrado com sucesso', res);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      });
    } else {
      this.markAllFieldsAsTouched(form);
      console.log(
        'Falha ao realizar login. Preencha os campos obrigatórios e tente novamente'
      );
    }
  }

  markAllFieldsAsTouched(form: NgForm) {
    Object.values(form.controls).forEach((control) => {
      control.markAsTouched(); // Marca os campos como tocados
    });
  }
}
