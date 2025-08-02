import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advantage-card',
  imports: [CommonModule],
  templateUrl: './advantage-card.component.html',
  styleUrl: './advantage-card.component.css'
})
export class AdvantageCardComponent implements OnInit {
  @Input() iconSrc!: string;
  @Input() title!: string;
  @Input() description!: string;

  constructor() { }

  ngOnInit(): void {
    // Validação de inputs
    if (!this.iconSrc || !this.title || !this.description) {
      console.error('AdvantageCardComponent requires iconSrc, title, and description inputs.');
    }
  }
}