import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() label?: string;
  @Input() id?: string;
  @Input() className: string = '';
  // Outras props do HTML, como 'type', 'placeholder', etc., podem ser passadas
  @Input() type: string = 'text';
  @Input() placeholder: string = '';

  get inputId(): string | undefined {
    return this.id || (this.label ? this.label.toLowerCase().replace(/\s/g, '-') : undefined);
  }
}