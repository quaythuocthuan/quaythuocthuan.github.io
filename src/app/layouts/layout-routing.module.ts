import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path        : '',
    loadChildren: () => import('../components/patient/patient.module').then(m => m.PatientModule),
  },
  // {
  //   path        : 'prescription',
  //   loadChildren: () => import('../components/prescription/prescription.module').then(m => m.PrescriptionModule),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
