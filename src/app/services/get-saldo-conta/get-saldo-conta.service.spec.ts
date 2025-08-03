import { TestBed } from '@angular/core/testing';

import { GetSaldoContaService } from './get-saldo-conta.service';

describe('GetSaldoContaService', () => {
  let service: GetSaldoContaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSaldoContaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
