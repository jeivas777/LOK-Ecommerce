import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  imports: [CommonModule],
  // Configuração para o ControlValueAccessor
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent implements ControlValueAccessor {
  // Inputs para customização (label, tipo, etc.)
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';

  value: any = ''; // Valor interno do input
  isDisabled: boolean = false;

  // Funções que o Angular nos dará para comunicarmos o estado
  private onChange = (value: any) => {};
  public onTouched = () => {};

  // Chamado quando o valor interno do input muda
  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(this.value); // Informa o Angular sobre a mudança
    this.onTouched(); // Marca o campo como "tocado"
  }

  // MÉTODO 1: Chamado pelo Angular para definir o valor no nosso componente
  writeValue(value: any): void {
    this.value = value;
  }

  // MÉTODO 2: O Angular nos dá uma função para chamarmos quando o valor mudar
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // MÉTODO 3: O Angular nos dá uma função para chamarmos quando o campo for "tocado"
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // MÉTODO 4: Chamado pelo Angular para desabilitar o nosso componente
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
