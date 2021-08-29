import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector   : 'app-delete-prescription-popup',
  templateUrl: './delete-prescription-popup.component.html',
  styleUrls  : ['./delete-prescription-popup.component.scss'],
})
export class DeletePrescriptionPopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeletePrescriptionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  gotoPrescriptionsList() {
    this.dialogRef.close();
    this.router.navigate(['', 'patients', this.data.patient.id]);
  }
}
