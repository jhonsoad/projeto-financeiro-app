import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

export interface DropdownOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
    providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent {
  @Input() label?: string;
  @Input() options: DropdownOption[] = [];
  @Input() id?: string;
  @Input() className: string = '';
  @Input() name: string = '';
  @Input() disabled: boolean = false;
  @Input() value: string = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  get selectId(): string | undefined {
    return this.id || (this.label ? this.label.toLowerCase().replace(/\s/g, '-') : undefined);
  }

    writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
