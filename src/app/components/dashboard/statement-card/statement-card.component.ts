import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatementListComponent } from '../statement-list/statement-list.component';
import { EditTransactionModalComponent } from '../edit-transaction-modal/edit-transaction-modal.component';
import { DeleteTransactionModalComponent } from '../delete-transaction-modal/delete-transaction-modal.component';
import { Movimentacao } from '../../../shared/interfaces/finance.interface';
import { Store } from '@ngrx/store';
import { selectMovimentacaoPorId } from '../../../shared/store/transacao.selectors';
import { deleteTransaction, editTransaction } from '../../../shared/store/transacao.actions';

@Component({
  selector: 'app-statement-card',
  standalone: true,
  imports: [CommonModule, StatementListComponent, EditTransactionModalComponent, DeleteTransactionModalComponent],
  templateUrl: './statement-card.component.html',
  styleUrl: './statement-card.component.css'
})
export class StatementCardComponent {
  
  isEditModalOpen: boolean = false;
  transactionToEdit: Movimentacao | null = null;

  isDeleteModalOpen: boolean = false;
  transactionToDelete: Movimentacao | null = null;

  constructor(private store: Store) {}

  onEditRequest(transaction: Movimentacao): void {
    this.transactionToEdit = transaction;
    this.isEditModalOpen = true;
  }

  onDeleteRequest(id: number): void {
    this.store.select(selectMovimentacaoPorId(id)).pipe(
    ).subscribe(transaction => {
      this.transactionToDelete = transaction || null;
      this.isDeleteModalOpen = true;
    });
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.transactionToEdit = null;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.transactionToDelete = null;
  }

  onEditComplete(updatedTransaction: Movimentacao): void {
    this.store.dispatch(editTransaction({ transaction: updatedTransaction }));
    this.closeEditModal();
  }

  onDeleteConfirm(id: number): void {
    this.store.dispatch(deleteTransaction({ id }));
    this.closeDeleteModal();
  }
}