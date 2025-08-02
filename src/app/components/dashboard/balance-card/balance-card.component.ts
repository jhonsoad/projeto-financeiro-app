import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplaceCommaPipe } from "../../../shared/pipes/replace-comma.pipe";

@Component({
  selector: 'app-balance-card',
  imports: [CommonModule, ReplaceCommaPipe],
  templateUrl: './balance-card.component.html',
  styleUrl: './balance-card.component.css'
})
export class BalanceCardComponent {
  @Input() greeting: string = '';
  @Input() date: string = '';
  @Input() balance: number = 0;
  @Input() accountType: string = '';
}
