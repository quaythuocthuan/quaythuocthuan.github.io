import { AgePipe } from 'src/app/common/pipes/age.pipe';
import { IdPipe } from 'src/app/common/pipes/id.pipe';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { PatientComponent } from '../patient/patient.component';
import { CreateComponent } from './create/create.component';
import {
  CreatePatientWarningComponent,
} from './create/dialogs/create-patient-warning/create-patient-warning.component';
import { PrescriptionRoutingModule } from './prescription-routing.module';
import { ShowComponent } from './show/show.component';

@NgModule({
  declarations: [
    CreateComponent,
    ShowComponent,
    CreatePatientWarningComponent,
    PatientComponent,
    AgePipe,
    IdPipe,
  ],
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    PrescriptionRoutingModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    FlexLayoutModule,
    MatDividerModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
  ],
})
export class PrescriptionModule { }
