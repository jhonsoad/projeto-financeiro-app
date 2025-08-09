export enum TransactionType {
  Debit = 'Debit',
  Credit = 'Credit',
}

export interface Account {
  id: string;
  type: TransactionType;
  userId: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: TransactionType;
  value: number;
  date: string;
  from?: string;
  to?: string;
  anexo?: string;
}

export interface Card {
  id: string;
  accountId: string;
  type: TransactionType;
  is_blocked: boolean;
  number: string;
  dueDate: string;
  functions: string;
  cvc: string;
  paymentDate: string | null;
  name: string;
}

export interface AccountResult {
  account: Account[];
  transactions: Transaction[];
  cards: Card[];
}

export interface GetAccountResponse {
  message: string;
  result: AccountResult;
}