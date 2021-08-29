import { isEmpty } from 'lodash';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { fromEvent, of } from 'rxjs';
import { merge } from 'rxjs/internal/observable/merge';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { Patient } from 'src/app/models/patient';
import { PatientsService } from 'src/app/services/patients.service';
import { PrescriptionsService } from 'src/app/services/prescriptions.service';
import { displayID } from 'src/app/utils';
import { SearchReponsePayload } from 'src/app/utils/types';

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import {
  DeletePrescriptionPopupComponent,
} from './delete-prescription-popup/delete-prescription-popup.component';

export interface PatientDataTable {
  id: string;
  name: string;
  birthday: number;
  age?: number;
  address: string;
}

const ELEMENT_DATA: PatientDataTable[] = [];

@Component({
  selector   : 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls  : ['./patient.component.scss'],
})
export class PatientComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'asciiName', 'age', 'birthday', 'phone', 'address'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  resultsLength = 0;
  pageEvent: PageEvent | undefined;
  maxPatientBirthYear = new Date().getFullYear();
  pageSize = 20;
  isLoading = false;

  @ViewChild('myForm') myForm: NgForm | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild('input') input: any;

  public patientInfo = this.fb.group({
    id         : [''],
    patientName: ['', Validators.required],
    birthday   : [null, Validators.max(new Date().getFullYear())],
    address    : [''],
    phone      : [''],
  });

  public patientSearchbyIdForm = this.fb.group({
    id: [''],
  });

  step = false;

  contextMenuPosition = { x: '0px', y: '0px' };
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger | any;

  constructor(
    private patientsService: PatientsService,
    private prescriptionsService: PrescriptionsService,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.isLoading = true;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.sort?.sortChange.subscribe(() => this.paginator!.pageIndex = 0);
    this.loadData();
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
      )
      .subscribe((event: any) => {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
      });
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
    this.patientInfo.patchValue({
      ...item,
      patientName: item.name,
    });
    this.setStep(true);
  }

  delete(item: any) {
    this.prescriptionsService.getByPatient(item.id, {})
      .subscribe(data => {
        if (isEmpty(data)) {
          this.patientsService.delete(item.id)
            .subscribe(() => {
              this.loadData();
            });
        } else {
          this.openDialog(data, item);
        }
      });
  }

  openDialog(data: any, item: any) {
    const dialogRef = this.dialog.open(DeletePrescriptionPopupComponent, {
      data: {
        prescription: data,
        patient     : item,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }

  loadData() {
    merge(
      this.sort!.sortChange, this.paginator!.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          let sort = this.sort?.active;
          let order = this.sort?.direction || 'desc';
          const offset = this.paginator?.pageIndex;

          if (sort === 'age') {
            sort  = 'birthday';
            order = this.sort?.direction === 'asc' ? 'desc' : 'asc';
          }

          return this.patientsService.getAll({
            sort,
            order,
            offset,
          })
            .pipe(catchError(() => of({
              totalCount: 0,
              data      : [],
            })));
        }),
        map(({ totalCount, data }: SearchReponsePayload<Patient[]>) => {
          this.resultsLength = totalCount;
          this.pageSize      = 20;
          return data.map(p => ({
            ...p,
            age: p.birthday,
          })) as PatientDataTable[];
        }),
      )
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.isLoading  = false;
      });
  }

  createpatientSubmit() {
    this.isLoading = true;

    if (this.patientInfo.valid) {
      const id = this.patientInfo.value.id;
      if (!id) {
        this.patientsService.create({
          name    : this.patientInfo.value.patientName,
          address : this.patientInfo.value.address,
          birthday: this.patientInfo.value.birthday,
          phone   : this.patientInfo.value.phone,
        }).subscribe(() => {
          this.patientInfo.reset();
          this.myForm?.resetForm();
          this.step = false;
          this.loadData();
        });
      } else {
        this.patientsService.update(id, {
          name    : this.patientInfo.value.patientName,
          address : this.patientInfo.value.address,
          birthday: this.patientInfo.value.birthday,
          phone   : this.patientInfo.value.phone,
        }).subscribe(() => {
          this.patientInfo.reset();
          this.myForm?.resetForm();
          this.step = false;
          this.loadData();
        });
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  searchPatientById() {
    this.isLoading = true;

    const { id } = this.patientSearchbyIdForm.value;
    if (id) {
      this.patientsService.findById(id)
        .subscribe(
          (data) => {
            this.resultsLength = 1;
            this.pageSize      = 1;
            this.dataSource    = new MatTableDataSource(data
              ? [{
                ...data,
                id : displayID(data.id || ''),
                age: data.birthday,
              } as PatientDataTable]
              : []);
            this.isLoading     = false;
          },
          (err) => {
            this.resultsLength = 1;
            this.pageSize      = 1;
            this.dataSource    = new MatTableDataSource([] as any);
            this.isLoading     = false;
          },
        );
    } else {
      this.loadData();
    }
  }

  goto(patient: Patient) {
    this.router.navigate(['patients', patient.id]);
  }

  setStep(open: boolean) {
    this.step = open;
  }

  cancel() {
    this.patientInfo.reset();
    this.step = false;
  }
}
