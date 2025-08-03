import { createReducer, on } from "@ngrx/store";
import { adicionartransacao, carregarMovimentacoes } from "./transacao.actions";
import { TipoMovimentacao } from "../enum/tipo-movimentacao.enum";
import { Movimentacao } from "../interfaces/finance.interface";


export interface State {
  movimentacoes: Movimentacao[];
}

export const initialState: State = {
  movimentacoes: []
};

export const transacaoReducer = createReducer(
  initialState,
  on(carregarMovimentacoes, (state, { movimentacoes }) => ({
    ...state,
    movimentacoes: [...movimentacoes]
  })),
  on(adicionartransacao, (state, { movimentacao }) => ({
    ...state,
    movimentacoes: [...state.movimentacoes, movimentacao]
  }))
)

export function getSaldoTotal(movimentacoes: Movimentacao[]): number {
  return movimentacoes.reduce((acc, mov) => {
    return mov.type === TipoMovimentacao.DEPOSITO ? acc + mov.amount : acc - mov.amount;
  }, 0);
}