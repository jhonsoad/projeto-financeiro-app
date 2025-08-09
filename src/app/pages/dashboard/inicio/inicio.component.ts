import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/dashboard/sidebar/sidebar.component';
import { BalanceCardComponent } from '../../../components/dashboard/balance-card/balance-card.component';
import { Account, Card, Transaction } from '../../../shared/interfaces/account.interface';
import { AccountService } from '../../../services/account/account.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { StatementCardComponent } from '../../../components/dashboard/statement-card/statement-card.component';
import { TransactionFormComponent } from '../../../components/dashboard/transaction-form/transaction-form.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, SidebarComponent, BalanceCardComponent, StatementCardComponent, TransactionFormComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  account!: Account[] | null;
  accountId!: string;
  transactions!: Transaction[] | null;
  cards!: Card[] | null;
  saldoTotal: number = 0;
  loading: boolean = false;
  error: any;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.fetchAccountData();
  }

  fetchAccountData(): void {
    this.loading = true;
    this.accountService.getAccountData().pipe(
      tap(response => {
        console.log('Resposta da API:', response);
        this.account = response.result.account;
        this.transactions = response.result.transactions;
        this.cards = response.result.cards;
        if (this.account && this.account.length > 0) {
          this.accountId = this.account[0].id;
        }
        this.saldoTotal = (this.transactions || []).reduce((total, transaction) => total + transaction.value, 0);
        this.loading = false;
      }),
      catchError(error => {
        console.error('Erro ao buscar dados da conta:', error);
        this.loading = false;
        this.error = error;
        return of(null);
      })
    ).subscribe();
  }

  onTransactionAdded(): void {
    this.fetchAccountData();
  }
}