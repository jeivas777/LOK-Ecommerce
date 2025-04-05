import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

@Component({
  selector: 'app-login-page',
  imports: [RouterModule, FormsModule, ErrorMessageComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  email: string = '';
  senha: string = '';

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Login confirmado');
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
