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

import { DialogDeleteComponent } from './patient-detail/dialog-delete/dialog-delete.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { DeletePrescriptionPopupComponent } from './delete-prescription-popup/delete-prescription-popup.component';

@NgModule({
  declarations: [
    PatientComponent,
    PatientDetailComponent,
    DialogDeleteComponent,
    DeletePrescriptionPopupComponent,
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
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
    MatMenuModule,
    PipesModule,
    MatProgressBarModule,
  ],
})
export class PatientModule { }
