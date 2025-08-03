import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movimentacao } from '../../../shared/interfaces/finance.interface';
import { ButtonComponent } from '../../common/button/button.component';
import { ModalComponent } from '../../common/modal/modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-transaction-modal',
  imports: [ButtonComponent, ModalComponent, CommonModule],
  templateUrl: './delete-transaction-modal.component.html',
  styleUrl: './delete-transaction-modal.component.css'
})
export class DeleteTransactionModalComponent {
  // Inputs para receber o estado e os dados do componente pai
  @Input() isDeleteModalOpen: boolean = false;
  @Input() transactionToDelete: Movimentacao | null = null;

  // Outputs para emitir eventos de volta para o componente pai
  @Output() onDeleteConfirm = new EventEmitter<number>();
  @Output() onClose = new EventEmitter<void>();

  constructor() {}

  getAbsolute(value: number): number {
    return Math.abs(value);
  }

  handleConfirmDelete(): void {
    if (this.transactionToDelete?.id) {
      // Emite o ID para exclusão e fecha a modal
      this.onDeleteConfirm.emit(this.transactionToDelete.id);
    }
  }
}
