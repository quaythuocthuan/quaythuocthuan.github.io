import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../pages/home/home.component';

const routes: Routes = [
  {
    path        : '',
    component   : HomeComponent,
    loadChildren: () => import('../components/prescription/prescription.module').then(m => m.PrescriptionModule),
  },
  {
    path        : 'prescription',
    component   : HomeComponent,
    loadChildren: () => import('../components/prescription/prescription.module').then(m => m.PrescriptionModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
