import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CreateComponent } from './create/create.component';
import { PrescriptionRoutingModule } from './prescription-routing.module';
import { ShowComponent } from './show/show.component';

@NgModule({
  declarations: [
    CreateComponent,
    ShowComponent,
  ],
  imports: [
    CommonModule,
    PrescriptionRoutingModule,
  ],
})
export class PrescriptionModule { }
