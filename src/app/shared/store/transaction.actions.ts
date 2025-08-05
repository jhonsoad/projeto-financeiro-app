import { createAction, props } from "@ngrx/store";
import { Movement } from "../interfaces/finance.interface";

export const addTrasaction = createAction(
  '[Transacao] Adicionar Transação',
  props<{ movement: Movement }>()
);

export const loadMoviments = createAction(
  '[Transacao] Carregar Movimentações',
  props<{ movements: Movement[] }>()
);

export const editTransaction = createAction(
  '[Transacao] Editar Transação',
  props<{ transaction: Movement }>()
);

export const editTransactionSuccess = createAction(
  '[Transacao] Edição de Transação Sucesso',
  props<{ transaction: Movement }>()
);

export const editTransactionFailure = createAction(
  '[Transacao] Edição de Transação Falha',
  props<{ error: any }>()
);

export const deleteTransaction = createAction(
  '[Transacao] Deletar Transação',
  props<{ id: number }>()
);
