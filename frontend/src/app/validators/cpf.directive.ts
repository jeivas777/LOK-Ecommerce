// src/app/validators/cpf.directive.ts

import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appCpfValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CpfValidatorDirective,
      multi: true,
    },
  ],
})
export class CpfValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const cpf = control.value;

    if (!cpf) {
      return null; // Não valida se o campo estiver vazio (deixe isso para o 'required')
    }

    // Remove caracteres especiais
    const cpfLimpo = cpf.replace(/[^\d]/g, '');

    if (cpfLimpo.length !== 11 || /^(\d)\1{10}$/.test(cpfLimpo)) {
      return { cpfInvalido: true }; // Retorna erro se não tiver 11 dígitos ou se todos forem iguais
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpfLimpo.substring(9, 10))) {
      return { cpfInvalido: true };
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpfLimpo.substring(10, 11))) {
      return { cpfInvalido: true };
    }

    return null; // Se passou em todas as verificações, o CPF é válido
  }
}
