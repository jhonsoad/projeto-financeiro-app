import { Component, Output, EventEmitter, Renderer2, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from '../../common/dropdown/dropdown.component';
import { InputComponent } from '../../common/input/input.component';
import { ButtonComponent } from '../../common/button/button.component';
import { Movement } from '../../../shared/interfaces/finance.interface';
import { MovementType } from '../../../shared/enum/tipo-movimentacao.enum';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-transaction-form',
  imports: [CommonModule, FormsModule, DropdownComponent, InputComponent, ButtonComponent],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent implements OnInit {
  @Output() onAddTransaction = new EventEmitter<Omit<Movement, 'id' | 'date'>>();

  transactionOptions = [
    { label: 'Selecione...', value: '' },
    { label: 'Depósito', value: MovementType.DEPOSITO },
    { label: 'Transferência', value: MovementType.TRANSFERENCIA },
  ];

  transactionType: MovementType | '' = '';
  value: string = '';
  errorMessage: string | null = null;
  baseUrl = environment.remoteBaseUrl;

  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, '--image-url', `url(${this.baseUrl}/assets/images/image-top-right.svg)`);
    // this.renderer.setStyle(this.el.nativeElement, '--image-url2', `url(${this.baseUrl}/assets/images/image-top-right.svg)`);
  }

  handleSubmit(): void {
    this.errorMessage = null;

    if (!this.transactionType || !this.value) {
      this.errorMessage = 'Por favor, selecione o tipo e insira o valor.';
      return;
    }

    const amount = parseFloat(this.value.replace(',', '.'));

    if (isNaN(amount)) {
      this.errorMessage = 'Por favor, insira um valor numérico válido.';
      return;
    }

    const finalAmount = (this.transactionType === MovementType.TRANSFERENCIA) ? -Math.abs(amount) : Math.abs(amount);
    this.onAddTransaction.emit({ movementType: this.transactionType, amount: finalAmount });
    this.transactionType = '';
    this.value = '';
  }

  handleValueChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const sanitizedValue = target.value.replace(/[^0-9,.]/g, '');
    this.value = sanitizedValue;
  }
}
