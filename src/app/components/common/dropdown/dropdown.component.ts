import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

export interface DropdownOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  @Input() label?: string;
  @Input() options: DropdownOption[] = [];
  @Input() id?: string;
  @Input() className: string = '';
  // Outras props do HTML, como 'disabled', 'name', etc., podem ser passadas via Input
  @Input() name?: string;
  @Input() disabled: boolean = false;

  get selectId(): string | undefined {
    return this.id || (this.label ? this.label.toLowerCase().replace(/\s/g, '-') : undefined);
  }
}