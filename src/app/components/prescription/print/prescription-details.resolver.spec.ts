import { TestBed } from '@angular/core/testing';

import { PrescriptionDetailsResolver } from './prescription-details.resolver';

describe('PrescriptionDetailsResolver', () => {
  let resolver: PrescriptionDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PrescriptionDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
