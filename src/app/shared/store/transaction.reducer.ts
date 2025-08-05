import { createReducer, on } from "@ngrx/store";
import { addTrasaction, loadMoviments, deleteTransaction, editTransactionSuccess } from "./transaction.actions";
import { MovementType } from "../enum/tipo-movimentacao.enum";
import { Movement } from "../interfaces/finance.interface";


export interface State {
  movimentacoes: Movement[];
}

export const initialState: State = {
  movimentacoes: []
};

export const transactionReducer = createReducer(
  initialState,
  on(loadMoviments, (state, { movements }) => ({
    ...state,
    movimentacoes: [...movements]
  })),
  on(addTrasaction, (state, { movement }) => ({
    ...state,
    movimentacoes: [...state.movimentacoes, movement]
  })),
  on(editTransactionSuccess, (state, { transaction }) => ({
    ...state,
    movimentacoes: state.movimentacoes.map(mov => mov.id === transaction.id ? transaction : mov)
  })),
  on(deleteTransaction, (state, { id }) => ({
    ...state,
    movimentacoes: state.movimentacoes.filter(mov => mov.id !== id)
  }))
)

export function getSaldoTotal(movimentacoes: Movement[]): number {
  return movimentacoes.reduce((acc, mov) => {
    return mov.movementType === MovementType.DEPOSITO ? acc + mov.amount : acc - mov.amount;
  }, 0);
}
