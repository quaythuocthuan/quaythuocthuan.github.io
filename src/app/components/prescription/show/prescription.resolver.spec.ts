import { TestBed } from '@angular/core/testing';

import { PrescriptionResolver } from './prescription.resolver';

describe('PrescriptionResolver', () => {
  let resolver: PrescriptionResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PrescriptionResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
