import { remove } from 'lodash';
import { Patient } from 'src/app/models/patient';
import { PrescriptionDetails } from 'src/app/models/prescription';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

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

  patient: Patient = {
    id       : '',
    address  : '-',
    name     : '',
    birthday : 0,
    asciiName: '',
  };

  prescriptionForms: FormGroup[] = [
    this.createPrescriptionForms(),
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.route.data.subscribe(({ patient }) => {
      this.patient = patient;
    });
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

  prescriptionSubmit(form: FormGroup) {
    const {
      medicine,
      quantity,
      typeMedicine,
      use,
    } = form.value as PrescriptionDetails;

    // this.prescriptionsService.create('', {
    //   medicine,
    //   quantity,
    //   prescriptionId: `${this.patient.id || ''}`,
    //   typeMedicine,
    //   use,
    // }).subscribe(({
    //   medicine,
    //   quantity,
    //   typeMedicine,
    //   use,
    //   id,
    // }) => {
    //   form.setValue({
    //     id,
    //     medicine,
    //     quantity,
    //     typeMedicine,
    //     use,
    //   });
    //   form.disable();
    // });
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
