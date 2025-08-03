import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Movement } from "../../shared/interfaces/finance.interface";
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: 'root',
})
export class PostSaldoService {
  private apiUrl = environment.url_dev;

  constructor(private http: HttpClient) {}

  adicionarTransacao(movimentcao: Movement): Observable<Movement> {
    return this.http.post<Movement>(`${this.apiUrl}/finance`, movimentcao)
  }
}
