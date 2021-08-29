/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { Patient } from 'src/app/models/patient';
import { PatientsService } from 'src/app/services/patients.service';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PatientResolverService implements Resolve<Patient> {
  constructor(
    private patientsService: PatientsService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Patient> {
    const id = route.paramMap!.get('patientId')!;

    return this.patientsService.findById(Number(id))
      .pipe(
        take(1),
        mergeMap((p: Patient) => {
          if (p) {
            return of(p);
          } else {
            this.router.navigate(['']);
            return EMPTY;
          }
        }),
      );
  }
}
