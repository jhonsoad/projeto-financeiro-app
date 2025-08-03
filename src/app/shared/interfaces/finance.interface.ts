import { MovementType } from "../enum/tipo-movimentacao.enum";

export interface Movement {
  id: number;
  movementType: MovementType;
  amount: number;
  date: string;
}
