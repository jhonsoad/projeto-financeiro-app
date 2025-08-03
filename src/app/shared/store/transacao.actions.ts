import { createAction, props } from "@ngrx/store";
import { Movimentacao } from "../interfaces/finance.interface";

export const adicionartransacao = createAction(
  '[Transacao] Adicionar Transação',
  props<{ movimentacao: Movimentacao }>()
);

export const carregarMovimentacoes = createAction(
  '[Transacao] Carregar Movimentações',
  props<{ movimentacoes: Movimentacao[] }>()
);

export const editTransaction = createAction(
  '[Transacao] Editar Transação',
  props<{ transaction: Movimentacao }>()
);

export const deleteTransaction = createAction(
  '[Transacao] Deletar Transação',
  props<{ id: number }>()
);