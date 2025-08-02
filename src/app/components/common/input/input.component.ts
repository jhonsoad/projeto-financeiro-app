import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() value: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';

  @Output() input = new EventEmitter<Event>();

  get inputId(): string | undefined {
    return this.id || (this.label ? this.label.toLowerCase().replace(/\s/g, '-') : undefined);
  }

  onInput(event: Event): void {
    this.input.emit(event);
  }
}