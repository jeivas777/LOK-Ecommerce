import { Component, OnInit } from '@angular/core';
import { CustomButtonComponent } from '../../../components/custom-button/custom-button.component';
import { TextInputComponent } from '../../../components/text-input/text-input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dados-pessoais',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dados-pessoais.component.html',
  styleUrl: './dados-pessoais.component.scss',
})
export class DadosPessoaisComponent implements OnInit {
  dadosPessoaisForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dadosPessoaisForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.dadosPessoaisForm?.valid) {
      const formData = this.dadosPessoaisForm.value;
      console.log('Dados do Formulário:', formData);
    } else {
      this.dadosPessoaisForm.markAllAsTouched();
      return;
    }
  }
}
