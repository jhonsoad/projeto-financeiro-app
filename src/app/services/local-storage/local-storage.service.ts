import { Injectable } from '@angular/core';
import { Transaction } from '../../shared/interfaces/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly STORAGE_KEY = 'transactions';

  loadTransactions(): Transaction[] {
    try {
      const serializedTransactions = localStorage.getItem(this.STORAGE_KEY);
      if (serializedTransactions === null) {
        return [];
      }
      return JSON.parse(serializedTransactions);
    } catch (error) {
      console.error('Error loading transactions from localStorage:', error);
      return [];
    }
  }

  saveTransactions(transactions: Transaction[]): void {
    try {
      const serializedTransactions = JSON.stringify(transactions);
      localStorage.setItem(this.STORAGE_KEY, serializedTransactions);
    } catch (error) {
      console.error('Error saving transactions to localStorage:', error);
    }
  }
}
