import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectSaldoTotal } from '../../../shared/store/transacao.selectors';

@Component({
  selector: 'app-balance-card',
  imports: [CommonModule],
  templateUrl: './balance-card.component.html',
  styleUrl: './balance-card.component.css'
})
export class BalanceCardComponent implements OnInit {
  saldo$: Observable<number>;
  mostrarSaldo: boolean = true;
  dataAtual: Date =new Date();
  greeting: string ="Olá, Joana! :)";
  accountType: string = 'Conta Corrente'

  constructor(private store: Store) {
    this.saldo$ = this.store.select(selectSaldoTotal);
  }

  ngOnInit(): void {
    this.dataAtual = new Date();
  }

  toggleMostrarSaldo(): void {
    this.mostrarSaldo = !this.mostrarSaldo;
  }
}
