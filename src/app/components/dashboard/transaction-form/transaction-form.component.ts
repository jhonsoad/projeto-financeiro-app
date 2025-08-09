import { Component, Output, EventEmitter, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../common/button/button.component';
import { InputComponent } from '../../common/input/input.component';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PostSaldoService } from '../../../services/post-saldo-conta/post-saldo-conta.service';
import { Transaction, TransactionType } from '../../../shared/interfaces/account.interface';
import { DropdownComponent } from '../../common/dropdown/dropdown.component';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [ButtonComponent, InputComponent, CommonModule, FormsModule, DropdownComponent],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent {
  @Input() accountId!: string;
  tipoMovimentacao: TransactionType = TransactionType.Credit;
  tipoMovimentacaoEnum = TransactionType;
  errorMessage: string | null = null;

  private postSaldoService = inject(PostSaldoService);

  @Output() transactionAdded = new EventEmitter<void>();

  transactionOptions = [
    { value: TransactionType.Credit, label: 'Crédito' },
    { value: TransactionType.Debit, label: 'Débito' },
  ];
  transactionType: TransactionType = TransactionType.Credit;
  value: number | null = null;

  handleSubmit(): void {
    if (this.value === null) {
       this.errorMessage = 'Por favor, selecione o tipo e insira o valor.';
      return;
    }

    const valorTransacao = this.transactionType === TransactionType.Debit
      ? -Math.abs(this.value)
      : Math.abs(this.value);

    const newTransaction: Transaction = {
      id: '',
      accountId: this.accountId,
      type: this.transactionType,
      date: new Date().toISOString(),
      value: valorTransacao
    };

    this.postSaldoService.addTransaction(newTransaction).pipe(
      tap(() => {
        console.log('Transação adicionada com sucesso!');
        this.transactionAdded.emit();
        this.value = null;
      }),
      catchError(error => {
        console.error('Erro ao adicionar transação:', error);
        return of(null);
      })
    ).subscribe();
  }
}