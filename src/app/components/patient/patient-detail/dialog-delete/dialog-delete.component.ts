import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector   : 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls  : ['./dialog-delete.component.scss'],
})
export class DialogDeleteComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  gotoDetails() {
    this.dialogRef.close();
    this.router.navigate(['', 'patients', this.data.prescription.patientId, 'prescriptions', this.data.prescription.id]);
  }
}
