import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {
  @Input() control!: NgModel; // Receives the control (e.g., nomeRef)
  @Input() fieldName: string = ''; // Custom field name for dynamic messages

  get errorMessage(): string | null {
    if (!this.control || !this.control.errors || !this.control.touched) {
      return null;
    }

    if (this.control.errors['required']) {
      return `* O campo ${this.fieldName} é obrigatório.`;
    }
    if (this.control.errors['email']) {
      return '* O e-mail não é válido.';
    }
    if (this.control.errors['minlength']) {
      return `* O campo ${this.fieldName} deve ter pelo menos ${this.control.errors['minlength'].requiredLength} caracteres.`;
    }
    if (this.control.errors['cpfInvalido']) {
      return '* O CPF informado é inválido.';
    }
    if (this.control.errors['emailInvalido']) {
      return '* O e-mail informado é inválido.';
    }

    return null;
  }
}
