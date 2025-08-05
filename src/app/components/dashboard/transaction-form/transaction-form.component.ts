import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from '../../common/dropdown/dropdown.component';
import { InputComponent } from '../../common/input/input.component';
import { ButtonComponent } from '../../common/button/button.component';
import { Movement } from '../../../shared/interfaces/finance.interface';
import { MovementType } from '../../../shared/enum/tipo-movimentacao.enum';
import { environment } from '../../../../environments/environment';
import { Store } from '@ngrx/store';
import { addTrasaction } from '../../../shared/store/transaction.actions';
import { PostSaldoService } from '../../../services/post-saldo-conta/post-saldo-conta.service';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownComponent, InputComponent, ButtonComponent],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent {

  transactionOptions = [
    { label: 'Selecione...', value: '' },
    { label: 'Depósito', value: MovementType.DEPOSITO },
    { label: 'Transferência', value: MovementType.TRANSFERENCIA },
  ];

  transactionType: MovementType | '' = '';
  value: string = '';
  errorMessage: string | null = null;
  baseUrl = environment.remoteBaseUrl;

  constructor(
    private postSaldoService: PostSaldoService,
    private store: Store
  ) {}

  handleSubmit(): void {
    this.errorMessage = null;

    if (!this.transactionType || !this.value) {
      this.errorMessage = 'Por favor, selecione o tipo e insira o valor.';
      return;
    }

    const amount = parseFloat(this.value.replace(',', '.'));

    if (isNaN(amount)) {
      this.errorMessage = 'Por favor, insira um valor numérico válido.';
      return;
    }

    const finalAmount = (this.transactionType === MovementType.TRANSFERENCIA) ? -Math.abs(amount) : Math.abs(amount);

    const now = new Date();
    const dateString = now.toISOString().split('T')[0];

    const newTransaction = {
      movementType: this.transactionType,
      amount: finalAmount,
      date: dateString,
    } as Movement;

    this.postSaldoService.adicionarTransacao(newTransaction).subscribe({
      next: (movimento) => {
        this.store.dispatch(addTrasaction({ movement: movimento }));
        this.transactionType = '';
        this.value = '';
      },
      error: (err) => {
        this.errorMessage = 'Ocorreu um erro ao adicionar a transação.';
        console.error(err);
      }
    });
  }

  handleValueChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const sanitizedValue = target.value.replace(/[^0-9,.]/g, '');
    this.value = sanitizedValue;
  }
}
