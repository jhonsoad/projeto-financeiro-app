import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Transaction } from "../../shared/interfaces/account.interface";


@Injectable({
  providedIn: 'root',
})
export class PostSaldoService {
  private apiUrl = environment.url_dev;

  constructor(private http: HttpClient) {}

  addTransaction(movimentacao: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/account/transaction`, movimentacao)
  }
}
