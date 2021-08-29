import { TestBed } from '@angular/core/testing';

import { PatientResolverService } from './patient-resolver.service';

describe('PatientResolverService', () => {
  let service: PatientResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
