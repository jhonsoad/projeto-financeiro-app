import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/dashboard/sidebar/sidebar.component';
import { BalanceCardComponent } from '../../../components/dashboard/balance-card/balance-card.component';
import { TransactionFormComponent } from '../../../components/dashboard/transaction-form/transaction-form.component';
import { GetSaldoService } from '../../../services/get-saldo-conta/get-saldo-conta.service';
import { Store } from '@ngrx/store';
import { Movimentacao } from '../../../shared/interfaces/finance.interface';
import { carregarMovimentacoes } from '../../../shared/store/transacao.actions';
import { StatementCardComponent } from '../../../components/dashboard/statement-card/statement-card.component';

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


  constructor(
    private store: Store,
    private saldoService: GetSaldoService
  ) { }

  ngOnInit(): void {
    this.saldoService.getSaldoTotal().subscribe((movimentacoes: Movimentacao[]) => {
      this.store.dispatch(carregarMovimentacoes({ movimentacoes}));
    })
  }
}