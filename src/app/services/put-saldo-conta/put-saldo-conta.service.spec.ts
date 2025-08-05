import { TestBed } from '@angular/core/testing';

import { PutSaldoContaService } from './put-saldo-conta.service';

describe('PutSaldoContaService', () => {
  let service: PutSaldoContaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PutSaldoContaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
