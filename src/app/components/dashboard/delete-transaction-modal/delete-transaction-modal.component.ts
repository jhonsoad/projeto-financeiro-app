import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../common/button/button.component';
import { ModalComponent } from '../../common/modal/modal.component';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../../shared/interfaces/account.interface';

@Component({
  selector: 'app-delete-transaction-modal',
  standalone: true,
  imports: [ButtonComponent, ModalComponent, CommonModule],
  templateUrl: './delete-transaction-modal.component.html',
  styleUrl: './delete-transaction-modal.component.css'
})
export class DeleteTransactionModalComponent {
  @Input() isDeleteModalOpen: boolean = false;
  @Input() transactionToDelete: Transaction | null = null;

  @Output() onDeleteConfirm = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<void>();

  constructor() {}

  getAbsolute(value: number): number {
    return Math.abs(value);
  }

  handleConfirmDelete(): void {
    if (this.transactionToDelete?.id) {
      this.onDeleteConfirm.emit(this.transactionToDelete.id);
    }
  }
}