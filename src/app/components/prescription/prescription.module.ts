import { PipesModule } from 'src/app/common/pipes.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { CreateComponent } from './create/create.component';
import {
  CreatePatientWarningComponent,
} from './create/dialogs/create-patient-warning/create-patient-warning.component';
import { PrescriptionRoutingModule } from './prescription-routing.module';
import { PrintComponent } from './print/print.component';
import { ShowComponent } from './show/show.component';

@NgModule({
  declarations: [
    CreateComponent,
    ShowComponent,
    CreatePatientWarningComponent,
    PrintComponent,
  ],
  imports: [
    CommonModule,
    PrescriptionRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
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
    MatSortModule,
    MatExpansionModule,
    PipesModule,
    MatProgressBarModule,
    MatMenuModule,
  ],
})
export class PrescriptionModule { }
