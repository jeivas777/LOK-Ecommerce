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
import { AuthService } from '../../../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dados-pessoais',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dados-pessoais.component.html',
  styleUrl: './dados-pessoais.component.scss',
})
export class DadosPessoaisComponent implements OnInit {
  dadosPessoaisForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: AuthService,
    private toastr: ToastrService
  ) {}

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
      this.dadosPessoaisForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const newUser = this.dadosPessoaisForm.value;

    // Pegar id do usuário logado

    // // Chamar PUT User
    // this.userService.update(id, newUser).subscribe({
    //   next: (res) => {
    //     this.toastr.success('Usuário alterado com sucesso');

    //     this.loading = false;
    //   },
    //   error: (err) => {
    //     this.toastr.error('Erro ao alterar usuário');

    //     console.error('Erro ao alterar dados pessoais', err);

    //     this.loading = false;
    //   },
    // });
  }
}
