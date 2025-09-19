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
    });

    this.userService.getUser().subscribe((res) => {
      this.dadosPessoaisForm.patchValue(res);
      this.user = {
        nome: res.nome,
        email: res.email,
        telefone: res.telefone,
        cpf: res.cpf,
      };
    });
  }

  onSubmit() {
    if (this.dadosPessoaisForm?.invalid) {
      this.dadosPessoaisForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const newUser = this.dadosPessoaisForm.value;

    if (JSON.stringify(this.user) == JSON.stringify(newUser)) {
      this.toastr.error('Não foram feitas alterações ao usuário');
      return;
    }

    this.userService.edit(newUser).subscribe({
      next: (res) => {
        console.log('Subscribe');
        this.toastr.success('Informações alteradas com sucesso :)');
      },
      error: (err) => {
        this.toastr.error('Erro ao alterar usuário');

        console.error('Erro ao alterar dados pessoais :(', err);
      },
    });
  }
}
