import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { editTransaction, editTransactionFailure, editTransactionSuccess } from './transaction.actions';
import { PutSaldoContaService } from '../../services/put-saldo-conta/put-saldo-conta.service';

@Injectable()
export class TransactionEffects {

  private actions$ = inject(Actions);
  private putSaldoContaService = inject(PutSaldoContaService);

  editTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editTransaction),
      switchMap(action =>
        this.putSaldoContaService.updateTransaction(action.transaction).pipe(
          map(updatedTransaction => editTransactionSuccess({ transaction: updatedTransaction })),
          catchError(error => {
            console.error('Erro ao editar transação:', error);
            return of(editTransactionFailure({ error }));
          })
        )
      )
    )
  );
}
