import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { transactionReducer } from './shared/store/transaction.reducer';
import { provideHttpClient } from '@angular/common/http';
import { TransactionEffects } from './shared/store/transaction.effects';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      transacao: transactionReducer
    }),
    provideEffects([TransactionEffects])
  ]
};
