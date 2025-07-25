import { Component } from '@angular/core';
import { CustomButtonComponent } from '../../../components/custom-button/custom-button.component';
import { TextInputComponent } from '../../../components/text-input/text-input.component';

@Component({
  selector: 'app-dados-pessoais',
  imports: [CustomButtonComponent, TextInputComponent],
  templateUrl: './dados-pessoais.component.html',
  styleUrl: './dados-pessoais.component.scss',
})
export class DadosPessoaisComponent {}
