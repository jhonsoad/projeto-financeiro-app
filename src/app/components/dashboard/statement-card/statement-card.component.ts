import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatementListComponent } from '../statement-list/statement-list.component';
import { EditTransactionModalComponent } from '../edit-transaction-modal/edit-transaction-modal.component';
import { DeleteTransactionModalComponent } from '../delete-transaction-modal/delete-transaction-modal.component';
import { Transaction } from '../../../shared/interfaces/account.interface';
import { DeleteTransactionService } from '../../../services/delete-transaction/delete-transaction.service'; // Importar o serviço
import { PutSaldoContaService } from '../../../services/put-saldo-conta/put-saldo-conta.service';
import { InicioComponent } from '../../../pages/dashboard/inicio/inicio.component';
import { InputComponent } from '../../common/input/input.component';
import { DropdownComponent } from '../../common/dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-statement-card',
  standalone: true,
  imports: [
    CommonModule,
    StatementListComponent,
    EditTransactionModalComponent,
    DeleteTransactionModalComponent,
    DropdownComponent,
    FormsModule
  ],
  templateUrl: './statement-card.component.html',
  styleUrl: './statement-card.component.css'
})
export class StatementCardComponent implements OnInit, OnChanges {
  @Input() transactions!: Transaction[] | null;
  @Input() accountId!: string | null;

  isEditModalOpen: boolean = false;
  transactionToEdit: Transaction | null = null;

  isDeleteModalOpen: boolean = false;
  transactionToDelete: Transaction | null = null;

  filteredTransactions: Transaction[] | null = null;
  searchQuery: string = '';
  filterType: string = '';

  constructor(
    private deleteService: DeleteTransactionService,
    private editService: PutSaldoContaService,
    private parentComponent: InicioComponent
  ) { }

  ngOnInit(): void {
    this.applyFilters();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions']) {
      this.applyFilters();
    }
  }

  applyFilters(): void {
    if (!this.transactions) {
      this.filteredTransactions = null;
      return;
    }

    let tempTransactions = this.transactions;

    if (this.filterType) {
      tempTransactions = tempTransactions.filter(t => t.type === this.filterType);
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      tempTransactions = tempTransactions.filter(t =>
        (t.anexo && t.anexo.toLowerCase().includes(query)) ||
        (t.from && t.from.toLowerCase().includes(query)) ||
        (t.to && t.to.toLowerCase().includes(query))
      );
    }

    this.filteredTransactions = tempTransactions;
  }

  onEditRequest(transaction: Transaction): void {
    this.transactionToEdit = transaction;
    this.isEditModalOpen = true;
  }

  onDeleteRequest(id: string): void {
    this.transactionToDelete = this.transactions?.find(t => t.id === id) || null;
    if (this.transactionToDelete) {
      this.isDeleteModalOpen = true;
    }
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.transactionToEdit = null;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.transactionToDelete = null;
  }

  onEditComplete(updatedTransaction: any): void {
    if (updatedTransaction) {
      this.editService.updateTransaction(updatedTransaction).subscribe({
        next: () => {
          this.parentComponent.fetchAccountData();
          this.closeEditModal();
        },
        error: (err) => {
          console.error('Erro ao atualizar a transação:', err);
        }
      });
    }
  }

  onDeleteConfirm(id: string): void {
    if (id) {
      this.deleteService.deleteTransaction(id).subscribe({
        next: () => {
          this.parentComponent.fetchAccountData();
          this.closeDeleteModal();
        },
        error: (err) => {
          console.error('Erro ao deletar a transação:', err);
        }
      });
    }
  }
}
