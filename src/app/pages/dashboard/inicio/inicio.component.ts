import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/dashboard/sidebar/sidebar.component';
import { BalanceCardComponent } from '../../../components/dashboard/balance-card/balance-card.component';
import { TransactionFormComponent } from '../../../components/dashboard/transaction-form/transaction-form.component';
import { StatementCardComponent } from '../../../components/dashboard/statement-card/statement-card.component';
import { Transaction } from '../../../shared/interfaces/transaction.model';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';


const INITIAL_BASE_BALANCE = 2500.00;

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    SidebarComponent,
    BalanceCardComponent,
    TransactionFormComponent,
    StatementCardComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  private _transactions: Transaction[] = [];
  balance: number = INITIAL_BASE_BALANCE;

  get transactions(): Transaction[] {
    return this._transactions;
  }

  set transactions(value: Transaction[]) {
    this._transactions = value;
    this.localStorageService.saveTransactions(this._transactions);
    this.calculateTotalBalance();
  }

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.transactions = this.localStorageService.loadTransactions();
  }

  private calculateTotalBalance(): void {
    this.balance = this.transactions.reduce((acc: number, transaction: Transaction) => {
      return acc + transaction.amount;
    }, INITIAL_BASE_BALANCE);
  }

  handleAddTransaction(newTransaction: Omit<Transaction, 'id' | 'date'>): void {
    const transactionWithId: Transaction = {
      ...newTransaction,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('pt-BR'),
    };
    this.transactions = [transactionWithId, ...this.transactions];
  }

  handleDeleteTransaction(id: string): void {
    this.transactions = this.transactions.filter(transaction => transaction.id !== id);
  }

  handleEditTransaction(updatedTransaction: Transaction): void {
    this.transactions = this.transactions.map(transaction =>
      transaction.id === updatedTransaction.id ? updatedTransaction : transaction
    );
  }
}