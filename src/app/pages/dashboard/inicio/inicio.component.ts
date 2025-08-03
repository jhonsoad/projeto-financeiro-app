import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetSaldoService } from '../../../services/get-saldo-conta/get-saldo-conta.service';
import { loadMoviments } from '../../../shared/store/transaction.actions';
import { Movement } from '../../../shared/interfaces/finance.interface';
import { selectMovimentacoes } from '../../../shared/store/transaction.selectors';
import { SidebarComponent } from '../../../components/dashboard/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { BalanceCardComponent } from '../../../components/dashboard/balance-card/balance-card.component';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, SidebarComponent, BalanceCardComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

    constructor(
    private store: Store,
    private saldoService: GetSaldoService
  ) { }

  ngOnInit(): void {
    this.saldoService.getSaldoTotal().subscribe((movements: Movement[]) => {
      this.store.dispatch(loadMoviments({ movements }));
    })

    this.store.select(selectMovimentacoes).subscribe(movimentacoesDoEstado => {
      console.log('Movimentações no estado do NgRx:', movimentacoesDoEstado);
    });
  }

}
