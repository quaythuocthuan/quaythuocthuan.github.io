import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientResolverService } from '../prescription/create/patient-resolver.service';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { PatientComponent } from './patient.component';

const routes: Routes = [
  {
    path     : '',
    component: PatientComponent,
  },
  {
    path     : 'patients',
    component: PatientComponent,
  },
  {
    path     : 'patients/:patientId',
    component: PatientDetailComponent,
    resolve  : {
      patient: PatientResolverService,
    },
  },
  {
    path        : 'patients/:patientId/prescriptions',
    loadChildren: () => import('../prescription/prescription.module').then(m => m.PrescriptionModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule { }
