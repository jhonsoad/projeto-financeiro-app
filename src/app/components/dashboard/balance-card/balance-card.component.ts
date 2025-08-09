import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-balance-card',
  imports: [CommonModule],
  templateUrl: './balance-card.component.html',
  styleUrl: './balance-card.component.css'
})
export class BalanceCardComponent implements OnInit {
  @Input() balance: number | null = 0;
  mostrarSaldo: boolean = true;
  dataAtual: Date =new Date();
  greeting: string ="Olá, Joana! :)";
  accountType: string = 'Conta Corrente'

  baseUrl = environment.remoteBaseUrl;

  ngOnInit(): void {
    this.dataAtual = new Date();
  }

  toggleMostrarSaldo(): void {
    this.mostrarSaldo = !this.mostrarSaldo;
  }
}
