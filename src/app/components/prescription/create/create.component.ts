import { remove } from 'lodash';
import { Prescription } from 'src/app/models/prescription';
import { PatientsService } from 'src/app/services/patients.service';
import { PrescriptionsService } from 'src/app/services/prescriptions.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import {
  CreatePatientWarningComponent,
} from './dialogs/create-patient-warning/create-patient-warning.component';

@Component({
  selector   : 'app-create',
  templateUrl: './create.component.html',
  styleUrls  : ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  maxPatientBirthYear = new Date().getFullYear();
  typeMedicines: string[] = [
    'viên',
    'chai',
  ];

  private patientId = 0;

  public patientInfo = this.fb.group({
    id         : [''],
    patientName: ['', Validators.required],
    birthday   : [null, Validators.max(new Date().getFullYear())],
    address    : [''],
  });

  prescriptionForms: FormGroup[] = [
    this.createPrescriptionForms(),
  ];

  constructor(
    private fb: FormBuilder,
    private patientsService: PatientsService,
    private prescriptionsService: PrescriptionsService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

  createPrescriptionForms(): FormGroup {
    return this.fb.group({
      id          : [''],
      medicine    : ['', Validators.required],
      quantity    : [null, Validators.required],
      typeMedicine: ['', Validators.required],
      use         : this.fb.group({
        morning   : [false],
        afternoon1: [false],
        afternoon2: [false],
        everning  : [false],
      }),
    });
  }

  patientInfoSubmit() {
    if (this.patientInfo.valid) {
      this.patientsService.create({
        name    : this.patientInfo.value.patientName,
        address : this.patientInfo.value.address,
        birthday: this.patientInfo.value.birthday,
      }).subscribe(({
        id,
        name,
        address,
        birthday,
      }) => {
        this.patientInfo.setValue({
          id,
          patientName: name,
          address,
          birthday,
        });

        this.patientId = id || 0;

        this.patientInfo.disable();
      });
    }
  }

  prescriptionSubmit(form: FormGroup) {
    if (this.patientId > 0) {
      const {
        medicine,
        quantity,
        typeMedicine,
        use,
      } = form.value as Prescription;

      this.prescriptionsService.create({
        medicine,
        quantity,
        patientId: this.patientId,
        typeMedicine,
        use,
      }).subscribe(({
        medicine,
        quantity,
        typeMedicine,
        use,
        id,
      }) => {
        form.setValue({
          id,
          medicine,
          quantity,
          typeMedicine,
          use,
        });
        form.disable();
      });
    } else {
      form.valid && this.dialog.open(CreatePatientWarningComponent);
    }
  }

  addMore() {
    this.prescriptionForms = [
      ...this.prescriptionForms,
      this.createPrescriptionForms(),
    ];
  }

  remove(index: number) {
    remove(this.prescriptionForms, (_f, i) => {
      return i === index;
    });
  }
}
