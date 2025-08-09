import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DeleteTransactionService {

  private apiUrl = `${environment.url_dev}`;

  constructor(private http: HttpClient) { }

  deleteTransaction(id: string): Observable<any> {
    const url = `${this.apiUrl}/account/transaction/${id}`;
    return this.http.delete(url);
  }
}

