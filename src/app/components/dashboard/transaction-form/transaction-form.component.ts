import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from '../../common/dropdown/dropdown.component';
import { InputComponent } from '../../common/input/input.component';
import { ButtonComponent } from '../../common/button/button.component';
import { Movimentacao } from '../../../shared/interfaces/finance.interface';
import { TipoMovimentacao } from '../../../shared/enum/tipo-movimentacao.enum';
@Component({
  selector: 'app-transaction-form',
  imports: [CommonModule, FormsModule, DropdownComponent, InputComponent, ButtonComponent],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent {
  @Output() onAddTransaction = new EventEmitter<Omit<Movimentacao, 'id' | 'date'>>();

  transactionOptions = [
    { label: 'Selecione...', value: '' },
    { label: 'Depósito', value: TipoMovimentacao.DEPOSITO },
    { label: 'Transferência', value: TipoMovimentacao.TRANSFERENCIA },
  ];

  transactionType: TipoMovimentacao | '' = '';
  value: string = '';
  errorMessage: string | null = null;

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

    const finalAmount = (this.transactionType === TipoMovimentacao.TRANSFERENCIA) ? -Math.abs(amount) : Math.abs(amount);
    this.onAddTransaction.emit({ type: this.transactionType, amount: finalAmount });
    this.transactionType = '';
    this.value = '';
  }

  handleValueChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const sanitizedValue = target.value.replace(/[^0-9,.]/g, '');
    this.value = sanitizedValue;
  }
}
