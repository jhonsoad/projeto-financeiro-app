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

  @Output() onEditRequest = new EventEmitter<Movement>();
  @Output() onDeleteRequest = new EventEmitter<number>();

  transacoes$: Observable<Movement[]> = of([]);
  baseUrl = environment.remoteBaseUrl;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.transacoes$ = this.store.select(selectMovimentacoes).pipe(
      map(movimentacoes => movimentacoes.slice(-8).reverse())
    );
  }

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

  handleEditClick(item: Movement): void {
    this.onEditRequest.emit(item);
  }

  handleDeleteClick(id: number): void {
    this.onDeleteRequest.emit(id);
  }
}
