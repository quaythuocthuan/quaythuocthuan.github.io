import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  {
    path     : '',
    component: CreateComponent,
  },
  {
    path     : 'create',
    component: CreateComponent,
  },
  {
    path     : 'show',
    component: ShowComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrescriptionRoutingModule { }
