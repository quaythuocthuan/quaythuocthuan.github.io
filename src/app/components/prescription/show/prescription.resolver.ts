/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { Prescription, PrescriptionDetails } from 'src/app/models/prescription';
import { PrescriptionsService } from 'src/app/services/prescriptions.service';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionResolver implements Resolve<Prescription> {
  constructor(
    private precriptionService: PrescriptionsService,
    private router: Router,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Prescription> {
    const patientId = route.paramMap!.get('patientId') || '';
    const prescriptionId = route.paramMap!.get('prescriptionId');

    return this.precriptionService.findById(patientId, prescriptionId)
      .pipe(
        take(1),
        mergeMap((p: Prescription) => {
          if (p) {
            return of({
              ...p,
              patientId,
            });
          } else {
            this.router.navigate(['']);
            return EMPTY;
          }
        }),
      );
  }
}
