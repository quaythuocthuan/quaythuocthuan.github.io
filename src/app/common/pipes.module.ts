import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AgePipe } from './pipes/age.pipe';
import { IDPipe } from './pipes/id.pipe';
import { PhonePipe } from './pipes/phone.pipe';

@NgModule({
  declarations: [
    IDPipe,
    AgePipe,
    PhonePipe,
  ],
  exports: [
    AgePipe,
    IDPipe,
    PhonePipe,
  ],
})
export class PipesModule { }
