import { Component, Input } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

@Component({
  selector: 'app-button',
  imports: [CommonModule, NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() className: string = '';

  get buttonClasses(): string[] {
    const classes = ['button', this.variant];
    if (this.className) {
      classes.push(this.className);
    }
    return classes.map(cls => cls);
  }
}