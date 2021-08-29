import { Patient } from 'src/app/models/patient';
import { Prescription, PrescriptionDetails } from 'src/app/models/prescription';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector   : 'app-print',
  templateUrl: './print.component.html',
  styleUrls  : ['./print.component.scss'],
})
export class PrintComponent implements OnInit {
  patient: Patient = {
    id       : '',
    address  : '',
    birthday : 0,
    name     : '',
    asciiName: '',
  };

  prescription: Prescription = {
    diagnostic: '',
    id        : '',
    patientId : '',
    createdAt : new Date(),
  };

  prescriptionDetails: PrescriptionDetails[] | undefined = [];

  constructor(
    private route: ActivatedRoute,
  ) {
    this.route.data.subscribe(({ patient, prescription, prescriptionDetails }) => {
      this.patient             = patient;
      this.prescription        = prescription;
      this.prescriptionDetails = prescriptionDetails;
    });
  }

  ngOnInit(): void {}
}
