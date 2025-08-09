import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Transaction } from '../../shared/interfaces/account.interface';

@Injectable({
  providedIn: 'root'
})
export class PutSaldoContaService {

  private apiUrl = environment.url_dev;

  constructor(private http: HttpClient) {}

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    const url = `${this.apiUrl}/account/transaction/${transaction.id}`
    return this.http.put<Transaction>(url, transaction);
  }
}
