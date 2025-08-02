import { Component, Input, Output, EventEmitter, ElementRef, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnChanges {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Output() onClose = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && changes['isOpen'].currentValue) {
      // Aqui você pode adicionar lógica para manipulação de DOM se necessário
      // (ex: adicionar uma classe ao body para evitar scroll)
    }
  }

  // Escuta o evento de click em todo o documento
  @HostListener('document:mousedown', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.closeModal();
    }
  }
  
  closeModal(): void {
    this.onClose.emit();
  }
}