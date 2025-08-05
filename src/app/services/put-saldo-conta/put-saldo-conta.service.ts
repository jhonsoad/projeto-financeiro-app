import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Movement } from '../../shared/interfaces/finance.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PutSaldoContaService {

  private apiUrl = environment.url_dev;

  constructor(private http: HttpClient) {}

  updateTransaction(transaction: Movement): Observable<Movement> {
    return this.http.put<Movement>(`${this.apiUrl}/finance/${transaction.id}`, transaction);
  }
}
