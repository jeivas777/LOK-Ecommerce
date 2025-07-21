import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ErrorMessageComponent } from '../../ecommerce/components/error-message/error-message.component';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { EmailValidatorDirective } from '../../validators/email.directive';

@Component({
  selector: 'app-login-page',
  imports: [
    RouterModule,
    FormsModule,
    ErrorMessageComponent,
    EmailValidatorDirective,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  email: string = '';
  senha: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit(form: NgForm) {
    this.loading = true;
    if (!form.valid) {
      this.markAllFieldsAsTouched(form);
      return;
    }

    const { email, senha } = form.value;

    this.authService.login(email, senha).subscribe({
      next: (res) => {
        this.toastr.success('Login realizado com sucesso!');

        setTimeout(() => {
          this.router.navigate(['/account']); // Redireciona para a página inicial após o login bem-sucedido
          this.loading = false;
        }, 1000);
      },
      error: (err) => {
        this.toastr.error(
          'Erro ao fazer login. Verifique suas credenciais e tente novamente.'
        );

        console.error('Erro ao fazer login:', err.message);
      },
    });
  }

  markAllFieldsAsTouched(form: NgForm) {
    Object.values(form.controls).forEach((control) => {
      control.markAsTouched(); // Marca os campos como tocados
    });
  }
}
