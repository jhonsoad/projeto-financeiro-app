import { TestBed } from '@angular/core/testing';

import { PostSaldoContaService } from './post-saldo-conta.service';

describe('PostSaldoContaService', () => {
  let service: PostSaldoContaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostSaldoContaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
