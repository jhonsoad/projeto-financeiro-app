import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Movimentacao } from '../../../shared/interfaces/finance.interface';
import { ButtonComponent } from '../../common/button/button.component';
import { ModalComponent } from '../../common/modal/modal.component';
import { InputComponent } from '../../common/input/input.component';
import { TipoMovimentacao } from '../../../shared/enum/tipo-movimentacao.enum';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-transaction-modal',
  imports: [ButtonComponent, ModalComponent, InputComponent, FormsModule, CommonModule],
  templateUrl: './edit-transaction-modal.component.html',
  styleUrl: './edit-transaction-modal.component.css'
})
export class EditTransactionModalComponent {
  // Inputs para receber o estado e os dados do componente pai
  @Input() isEditModalOpen: boolean = false;
  @Input() transactionToEdit: Movimentacao | null = null;

  // Outputs para emitir eventos de volta para o componente pai
  @Output() onEditComplete = new EventEmitter<Movimentacao>();
  @Output() onClose = new EventEmitter<void>();

  editAmount: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    // Inicializa o valor do formulário quando a transação muda
    if (changes['transactionToEdit'] && this.transactionToEdit) {
      this.editAmount = Math.abs(this.transactionToEdit.amount).toFixed(2).replace('.', ',');
    }
  }

  handleSaveEdit(): void {
    if (this.transactionToEdit && this.editAmount) {
      const newAmount = parseFloat(this.editAmount.replace(',', '.'));

      if (isNaN(newAmount)) {
        console.error('Valor inválido. Por favor, insira um número.');
        return;
      }

      const finalAmount = this.transactionToEdit.type === TipoMovimentacao.TRANSFERENCIA && newAmount > 0
        ? -newAmount
        : newAmount;

      const updatedTransaction: Movimentacao = {
        ...this.transactionToEdit,
        amount: finalAmount,
      };

      // Emite a transação atualizada e fecha a modal
      this.onEditComplete.emit(updatedTransaction);
    }
  }
}
