import { isEmpty } from 'lodash';
import { merge } from 'rxjs/internal/observable/merge';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { switchMap } from 'rxjs/operators';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Patient } from 'src/app/models/patient';
import { Prescription } from 'src/app/models/prescription';
import { PrescriptionsDetailsService } from 'src/app/services/prescriptions-details.service';
import { PrescriptionsService } from 'src/app/services/prescriptions.service';
import { SearchReponsePayload } from 'src/app/utils/types';

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';

const ELEMENT_DATA: Prescription[] = [];

@Component({
  selector   : 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls  : ['./patient-detail.component.scss'],
})
export class PatientDetailComponent implements OnInit, AfterViewInit {
  maxPatientBirthYear = new Date().getFullYear();
  isLoading = false;

  patient: Patient = {
    id       : '',
    address  : '-',
    name     : '',
    birthday : 0,
    asciiName: '',
  };

  prescriptionForm = this.fb.group({
    id        : [''],
    diagnostic: ['', Validators.required],
  });

  prescriptionSearchbyIdForm = this.fb.group({
    id: [''],
  });

  @ViewChild('myForm') myForm: NgForm | undefined;

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = ['id', 'diagnostic', 'createdAt'];
  pageEvent: PageEvent | undefined;
  resultsLength = 0;
  pageSize = 20;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  shouldShowTable = false;

  step = false;

  contextMenuPosition = { x: '0px', y: '0px' };
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger | any;

  constructor(
    private route: ActivatedRoute,
    private prescriptionsService: PrescriptionsService,
    private prescriptionsDetailsService: PrescriptionsDetailsService,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.route.data.subscribe(({ patient }) => {
      this.patient = patient;
    });
  }

  ngOnInit(): void {}

  loadData() {
    merge(this.sort!.sortChange, this.paginator!.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.prescriptionsService.getByPatient(this.patient.id, {
            sort  : this.sort?.active || 'updatedAt',
            order : this.sort?.direction,
            offset: 0,
          })
            .pipe(catchError(() => {
              this.shouldShowTable = false;
              return of({
                totalCount: 0,
                data      : [],
              });
            }));
        }),
        map(({ totalCount, data }: SearchReponsePayload<Prescription[]>) => {
          this.resultsLength = totalCount;
          this.pageSize      = 20;
          return data;
        }),
      ).subscribe(data => {
        this.shouldShowTable = true;
        this.dataSource      = new MatTableDataSource(data);
      });
  }

  ngAfterViewInit() {
    this.sort?.sortChange.subscribe(() => this.paginator!.pageIndex = 0);
    this.loadData();
    // fromEvent(this.input.nativeElement, 'keyup')
    //   .pipe(
    //     debounceTime(500),
    //   ).subscribe((event: any) => {
    //     const filterValue = (event.target as HTMLInputElement).value;
    //     this.dataSource.filter = filterValue.trim().toLowerCase();
    //   });
  }

  prescriptionSubmit() {
    const {
      diagnostic,
      id,
    } = this.prescriptionForm.value;

    if (!id) {
      this.prescriptionsService.create({
        patientId: this.patient.id,
        diagnostic,
      }).subscribe(() => {
        this.cancel();
        this.myForm?.resetForm();
        this.loadData();
      });
    } else {
      this.prescriptionsService.update({
        id,
        patientId: this.patient.id,
      }, {
        diagnostic,
      }).subscribe(() => {
        this.cancel();
        this.myForm?.resetForm();
        this.loadData();
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  searchPrescriptionById() {
    const { id } = this.prescriptionSearchbyIdForm.value;

    if (isEmpty(id)) {
      this.loadData();
    } else {
      this.prescriptionsService.findById(this.patient.id, id)
        .subscribe(
          (data) => {
            this.resultsLength = 1;
            this.pageSize      = 1;
            this.dataSource    = new MatTableDataSource(data as any);
            this.isLoading     = false;
          },
          (err) => {
            this.resultsLength = 1;
            this.pageSize      = 1;
            this.dataSource    = new MatTableDataSource([] as any);
            this.isLoading     = false;
          },
        );
    }
  }

  goto(prescription: Prescription) {
    this.router.navigate(['prescriptions', prescription.id], { relativeTo: this.route });
  }

  setStep(step: boolean) {
    this.step = step;
  }

  cancel() {
    this.prescriptionForm.reset();
    this.step = false;
  }

  onContextMenu(event: MouseEvent, item: any) {
    event.preventDefault();

    this.contextMenuPosition = {
      x: event.clientX + 'px',
      y: event.clientY + 'px',
    };

    this.trigger.menuData = { item: item };
    this.trigger?.menu.focusFirstItem('mouse');
    this.trigger?.openMenu();
  }

  edit(item: any) {
    this.prescriptionForm.patchValue(item);
    this.step = true;
  }

  delete(item: any) {
    this.prescriptionsDetailsService.getPrescriptionDetails({
      patientId     : this.patient.id,
      prescriptionId: item.id,
    })
      .subscribe((data) => {
        if (isEmpty(data)) {
          this.prescriptionsService.delete({
            id       : item.id,
            patientId: this.patient.id,
          })
            .subscribe(() => {
              this.loadData();
            });
        } else {
          this.openDialog(data, item);
        }
      });
  }

  openDialog(data: any, item: any) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {
        prescriptionsDetails: data,
        prescription        : item,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }
}
