import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { Transaction } from '../../../shared/interfaces/account.interface';

@Component({
  selector: 'app-statement-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statement-list.component.html',
  styleUrl: './statement-list.component.css'
})
export class StatementListComponent {

  @Input() transactions: Transaction[] | null = [];
  
  @Output() onEditRequest = new EventEmitter<Transaction>();
  @Output() onDeleteRequest = new EventEmitter<string>();

  baseUrl = environment.remoteBaseUrl;

  capitalizeFirstLetter(string: string): string {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getMonthName(dateString: string | undefined): string {
    if (!dateString) {
      return 'Mês não informado';
    }
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleString('pt-BR', { month: 'long' });
  }

  getAbsolute(value: number): number {
    return Math.abs(value);
  }

  handleEditClick(transaction: Transaction) {
    this.onEditRequest.emit(transaction);
  }

  handleDeleteClick(id: string) {
    this.onDeleteRequest.emit(id);
  }
}