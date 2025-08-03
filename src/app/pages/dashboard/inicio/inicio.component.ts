import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetSaldoService } from '../../../services/get-saldo-conta/get-saldo-conta.service';
import { loadMoviments } from '../../../shared/store/transaction.actions';
import { Movement } from '../../../shared/interfaces/finance.interface';
import { selectMovimentacoes } from '../../../shared/store/transaction.selectors';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

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
