import { TestBed } from '@angular/core/testing';

import { DeleteTransactionService } from './delete-transaction.service';

describe('DeleteTransactionService', () => {
  let service: DeleteTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
