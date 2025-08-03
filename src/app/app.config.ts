import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store'; // Importe o provideStore
import { routes } from './app.routes';
import { transactionReducer } from './shared/store/transaction.reducer';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    // Adicione a configuração do NgRx aqui
    provideStore({
      transacao: transactionReducer
    })
  ]
};
