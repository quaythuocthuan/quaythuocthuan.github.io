/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { PrescriptionDetails } from 'src/app/models/prescription';
import { PrescriptionsDetailsService } from 'src/app/services/prescriptions-details.service';
import { SearchReponsePayload } from 'src/app/utils/types';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionDetailsResolver implements Resolve<PrescriptionDetails[]> {
  constructor(
    private prescriptionsDetailsService: PrescriptionsDetailsService,
    private router: Router,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PrescriptionDetails[]> {
    const patientId = route.paramMap!.get('patientId') || '';
    const prescriptionId = route.paramMap!.get('prescriptionId');

    return this.prescriptionsDetailsService.getPrescriptionDetails({
      patientId,
      prescriptionId,
    }).pipe(
      mergeMap((res: SearchReponsePayload<PrescriptionDetails[]>) => {
        return of(res.data);
      }),
    );
  }
}
