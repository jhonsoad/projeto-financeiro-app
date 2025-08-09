import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GetAccountResponse } from '../../shared/interfaces/account.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = `${environment.url_dev}`;

  constructor(private http: HttpClient) { }

  getAccountData(): Observable<GetAccountResponse> {
    return this.http.get<GetAccountResponse>(`${this.apiUrl}/account`).pipe(
      tap(response => console.log('Resposta da API (account.service):', response))
    )
  }
}