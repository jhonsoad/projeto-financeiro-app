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

export const deleteTransaction = createAction(
  '[Transacao] Deletar Transação',
  props<{ id: number }>()
);
