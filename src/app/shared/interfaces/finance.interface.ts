import { TipoMovimentacao } from "../enum/tipo-movimentacao.enum";

export interface Movimentacao {
  id: number;
  type: TipoMovimentacao;
  amount: number;
  date: string;
}