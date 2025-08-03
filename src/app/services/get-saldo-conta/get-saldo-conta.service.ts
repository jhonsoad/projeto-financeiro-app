import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Movement } from "../../shared/interfaces/finance.interface";

@Injectable({
  providedIn: 'root',
})
export class GetSaldoService {
  private apiUrl = environment.url_dev;

  constructor(private http: HttpClient) {
  }

  getSaldoTotal(): Observable<Movement[]> {
    return this.http.get<Movement[]>(`${this.apiUrl}/finance`)
  }
}
