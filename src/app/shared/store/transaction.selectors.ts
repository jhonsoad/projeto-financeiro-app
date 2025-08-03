import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./transaction.reducer";

export const selectTransacaoState = createFeatureSelector<State>('transacao');

export const selectMovimentacoes = createSelector(
  selectTransacaoState,
  (state: State) => state.movimentacoes
);

export const selectSaldoTotal = createSelector(
  selectTransacaoState,
  (state: State) => {
    return state.movimentacoes.reduce((acc, mov) => {
      return mov.movementType === 'DEPOSITO' ? acc + mov.amount : acc - mov.amount;
    }, 0);
  }
)

export const selectMovimentacaoPorId = (id: number) =>
  createSelector(
    selectMovimentacoes,
    movimentacoes => movimentacoes.find(mov => mov.id === id)
  );
