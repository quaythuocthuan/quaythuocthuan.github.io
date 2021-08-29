import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientResolverService } from './create/patient-resolver.service';
import { PrescriptionDetailsResolver } from './print/prescription-details.resolver';
import { PrintComponent } from './print/print.component';
import { PrescriptionResolver } from './show/prescription.resolver';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  {
    path     : '',
    component: ShowComponent,
  },
  {
    path     : ':prescriptionId',
    component: ShowComponent,
    resolve  : {
      prescription: PrescriptionResolver,
      patients    : PatientResolverService,
    },
  },
  {
    path     : ':prescriptionId/print',
    component: PrintComponent,
    resolve  : {
      prescription       : PrescriptionResolver,
      patient            : PatientResolverService,
      prescriptionDetails: PrescriptionDetailsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrescriptionRoutingModule { }
