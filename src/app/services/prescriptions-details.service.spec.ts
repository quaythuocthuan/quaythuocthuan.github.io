import { TestBed } from '@angular/core/testing';

import { PrescriptionsDetailsService } from './prescriptions-details.service';

describe('PrescriptionsDetailsService', () => {
  let service: PrescriptionsDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrescriptionsDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
