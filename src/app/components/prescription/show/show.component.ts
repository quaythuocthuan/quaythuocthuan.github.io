import { fromEvent, merge, of } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { Patient } from 'src/app/models/patient';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Prescription, PrescriptionDetails } from 'src/app/models/prescription';
import { PatientsService } from 'src/app/services/patients.service';
import { PrescriptionsDetailsService } from 'src/app/services/prescriptions-details.service';
import { PrescriptionsService } from 'src/app/services/prescriptions.service';
import { SearchReponsePayload } from 'src/app/utils/types';

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

const ELEMENT_DATA: PrescriptionDetails[] = [];

@Component({
  selector   : 'app-show',
  templateUrl: './show.component.html',
  styleUrls  : ['./show.component.scss'],
})
export class ShowComponent implements OnInit, AfterViewInit {
  maxPatientBirthYear = new Date().getFullYear();
  isLoading = false;

  prescription: Prescription = {
    id        : '',
    patientId : '',
    diagnostic: '',
  };

  patient: Patient = {
    address  : '',
    birthday : 0,
    name     : '',
    id       : '',
    asciiName: '',
    phone    : '',
  }

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns = ['medicine', 'quantity', 'typeMedicine', 'use'];
  resultsLength = 0;
  pageSize = 20;

  pageEvent: PageEvent | undefined;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild('input') input: any;
  @ViewChild('myForm') myForm: NgForm | undefined;

  prescriptionForm: FormGroup = this.fb.group({
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

  typeMedicines: string[] = [
    'viên',
    'chai',
  ];

  step = false;

  contextMenuPosition = { x: '0px', y: '0px' };
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger | any;

  constructor(
    private route: ActivatedRoute,
    private prescriptionService: PrescriptionsService,
    private patientsService: PatientsService,
    private prescriptionsDetailsService: PrescriptionsDetailsService,
    private fb: FormBuilder,
  ) {
    this.route.data.subscribe(({ prescription }) => {
      if (prescription) {
        this.prescription = prescription;
        this.patientsService.findById(Number(this.prescription.patientId))
          .subscribe(d => {
            this.patient = d;
          });
      } else {
        const { patientId } = this.route.snapshot.params;

        this.patientsService.findById(Number(patientId))
          .subscribe(d => {
            this.patient = d;
          });
      }
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.sort?.sortChange.subscribe(() => this.paginator!.pageIndex = 0);
    this.loadData();
    if (this.prescription.id) {
      fromEvent(this.input.nativeElement, 'keyup')
        .pipe(
          debounceTime(500),
        )
        .subscribe((event: any) => {
          const filterValue = (event.target as HTMLInputElement).value;
          this.dataSource.filter = filterValue.trim().toLowerCase();
        });
    }
  }

  loadData() {
    if (this.prescription.id) {
      merge(this.sort!.sortChange, this.paginator!.page)
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

            if (!this.prescription.id) {
              return of({
                totalCount: 0,
                data      : [],
              });
            }

            return this.prescriptionsDetailsService.getPrescriptionDetails({
              patientId     : this.prescription.patientId,
              prescriptionId: this.prescription.id,
              sort,
              order,
              offset,
            })
              .pipe(catchError(() => of({
                totalCount: 0,
                data      : [],
              })));
          }),
          map(({ totalCount, data }: SearchReponsePayload<PrescriptionDetails[]>) => {
            this.resultsLength = totalCount;
            this.pageSize      = 20;
            return data;
          }),
        )
        .subscribe(data => this.dataSource = new MatTableDataSource(data));
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  prescriptionSubmit() {
    const {
      medicine,
      quantity,
      typeMedicine,
      use,
      id,
    } = this.prescriptionForm.value;

    if (!id) {
      this.prescriptionsDetailsService.create(this.patient.id, {
        medicine,
        quantity,
        prescriptionId: `${this.prescription.id || ''}`,
        typeMedicine,
        use,
      })
        .subscribe(() => {
          this.cancel();
          this.myForm?.resetForm();
          this.loadData();
        });
    } else {
      this.prescriptionsDetailsService.update({
        id,
        patientId     : this.patient.id,
        prescriptionId: this.prescription.id,
      }, {
        medicine,
        quantity,
        typeMedicine,
        use,
      })
        .subscribe(() => {
          this.cancel();
          this.myForm?.resetForm();
          this.loadData();
        });
    }
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
    this.prescriptionsDetailsService.delete({
      id            : item.id,
      patientId     : this.patient.id,
      prescriptionId: this.prescription.id,
    })
      .subscribe(() => {
        this.cancel();
        this.myForm?.resetForm();
        this.loadData();
      });
  }
}
