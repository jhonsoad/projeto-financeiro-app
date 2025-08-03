import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movement } from '../../../shared/interfaces/finance.interface';
import { map, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectMovimentacoes } from '../../../shared/store/transaction.selectors';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-statement-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statement-list.component.html',
  styleUrl: './statement-list.component.css'
})
export class StatementListComponent implements OnInit {

  // Eventos emitidos para o componente pai
  @Output() onEditRequest = new EventEmitter<Movement>();
  @Output() onDeleteRequest = new EventEmitter<number>();

  transacoes$: Observable<Movement[]> = of([]);
  baseUrl = environment.remoteBaseUrl;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // A lógica de busca e formatação dos dados fica aqui, longe do componente pai
    this.transacoes$ = this.store.select(selectMovimentacoes).pipe(
      map(movimentacoes => movimentacoes.slice(-8).reverse())
    );
  }

  // Métodos de formatação
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

  // Métodos que emitem eventos
  handleEditClick(item: Movement): void {
    this.onEditRequest.emit(item);
  }

  handleDeleteClick(id: number): void {
    this.onDeleteRequest.emit(id);
  }
}
