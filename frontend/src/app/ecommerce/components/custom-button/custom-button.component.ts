import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent {
  // 'submit' ou 'button'
  @Input() type: 'submit' | 'button' = 'button';
  // Para estilização customizada (ex: 'primary', 'secondary')
  @Input() variant: 'primary' | 'secondary' = 'primary';
  // Para desabilitar o botão
  @Input() disabled: boolean = false;

  // Emite um evento quando o botão é clicado
  @Output() onClick = new EventEmitter<void>();

  onButtonClick(): void {
    this.onClick.emit();
  }
}
