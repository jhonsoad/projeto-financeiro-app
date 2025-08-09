import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ButtonComponent } from '../../common/button/button.component';
import { ModalComponent } from '../../common/modal/modal.component';
import { InputComponent } from '../../common/input/input.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../../shared/interfaces/account.interface';

@Component({
  selector: 'app-edit-transaction-modal',
  imports: [ButtonComponent, ModalComponent, InputComponent, FormsModule, CommonModule],
  templateUrl: './edit-transaction-modal.component.html',
  styleUrl: './edit-transaction-modal.component.css'
})
export class EditTransactionModalComponent {
  @Input() isEditModalOpen: boolean = false;
  @Input() transactionToEdit: Transaction | null = null;

  @Output() onEditComplete = new EventEmitter<Transaction>();
  @Output() onClose = new EventEmitter<void>();

  editAmount: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactionToEdit'] && this.transactionToEdit) {
      this.editAmount = Math.abs(this.transactionToEdit.value).toFixed(2).replace('.', ',');
    }
  }

  handleSaveEdit(): void {
    if (this.transactionToEdit && this.editAmount) {
      const newAmount = parseFloat(this.editAmount.replace(',', '.'));

      if (isNaN(newAmount)) {
        console.error('Valor inválido. Por favor, insira um número.');
        return;
      }

      const finalAmount = this.transactionToEdit.type === 'Debit' && newAmount > 0
        ? -newAmount
        : newAmount;

      const updatedTransaction: Transaction = {
        ...this.transactionToEdit,
        value: finalAmount,
      };

      this.onEditComplete.emit(updatedTransaction);
    }
  }
}
