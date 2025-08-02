import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../common/input/input.component';
import { ButtonComponent } from '../../common/button/button.component';
import { ModalComponent } from '../../common/modal/modal.component';
import { ReplaceCommaPipe } from '../../../shared/pipes/replace-comma.pipe';


export interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
}

@Component({
  selector: 'app-statement-card',
  imports: [CommonModule, FormsModule, InputComponent, ButtonComponent, ModalComponent, ReplaceCommaPipe],
  templateUrl: './statement-card.component.html',
  styleUrl: './statement-card.component.css'
})
export class StatementCardComponent {
  // public Math = Math;

  @Input() items: Transaction[] = [];
  @Output() onDeleteTransaction = new EventEmitter<string>();
  @Output() onEditTransaction = new EventEmitter<Transaction>();

  isEditModalOpen: boolean = false;
  transactionToEdit: Transaction | null = null;
  editAmount: string = '';

  isDeleteModalOpen: boolean = false;
  transactionToDeleteId: string | null = null;
  transactionToDeleteDetails: Transaction | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      // Ordena por data, se necessário
      this.items.sort((a, b) => new Date(this.formatDateForSorting(b.date)).getTime() - new Date(this.formatDateForSorting(a.date)).getTime());
    }
  }

  formatDateForSorting(dateString: string): string {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateString;
  }

  capitalizeFirstLetter(string: string): string {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getMonthName(dateString: string): string {
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const date = new Date(year, month, day);

    if (isNaN(date.getTime())) {
      console.warn('Data inválida para getMonthName:', dateString);
      return 'Mês Inválido';
    }

    const monthName = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(date);
    return this.capitalizeFirstLetter(monthName);
  }

  getAbsolute(value: number): number {
    return Math.abs(value);
  }

  handleEditClick(item: Transaction): void {
    this.transactionToEdit = item;
    this.editAmount = Math.abs(item.amount).toFixed(2).replace('.', ',');
    this.isEditModalOpen = true;
  }

  handleSaveEdit(): void {
    if (this.transactionToEdit && this.editAmount) {
      const newAmount = parseFloat(this.editAmount.replace(',', '.'));

      if (isNaN(newAmount)) {
        alert('Valor inválido. Por favor, insira um número.');
        return;
      }

      const finalAmount = this.transactionToEdit.type === 'Transferência' && newAmount > 0
        ? -newAmount
        : newAmount;

      const updatedTransaction: Transaction = {
        ...this.transactionToEdit,
        amount: finalAmount,
      };
      this.onEditTransaction.emit(updatedTransaction);
      this.handleCloseEditModal();
    }
  }

  handleCloseEditModal(): void {
    this.isEditModalOpen = false;
    this.transactionToEdit = null;
    this.editAmount = '';
  }

  handleDeleteClick(id: string): void {
    const transactionFound = this.items.find(item => item.id === id);
    if (transactionFound) {
      this.transactionToDeleteId = id;
      this.transactionToDeleteDetails = transactionFound;
      this.isDeleteModalOpen = true;
    }
  }

  handleConfirmDelete(): void {
    if (this.transactionToDeleteId) {
      this.onDeleteTransaction.emit(this.transactionToDeleteId);
      this.handleCloseDeleteModal();
    }
  }

  handleCloseDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.transactionToDeleteId = null;
    this.transactionToDeleteDetails = null;
  }
}
