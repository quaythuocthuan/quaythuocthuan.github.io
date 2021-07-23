import { of } from 'rxjs';
import { merge } from 'rxjs/internal/observable/merge';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { PatientsService } from 'src/app/services/patients.service';

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface PatientDataTable {
  id: Number;
  name: string;
  birthday: number;
  age: number;
  address: string;
}

const ELEMENT_DATA: PatientDataTable[] = [
  {
    id      : 101,
    name    : 'John',
    birthday: 1997,
    age     : 1997,
    address : 'USA',
  },
  {
    id      : 102,
    name    : 'Minh',
    birthday: 1966,
    age     : 1966,
    address : 'VN',
  },
  {
    id      : 103,
    name    : 'Hoa',
    birthday: 1983,
    age     : 1983,
    address : 'JP',
  },
  {
    id      : 104,
    name    : 'Tuan',
    birthday: 1967,
    age     : 1967,
    address : 'KR',
  },
];

@Component({
  selector   : 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls  : ['./patient.component.scss'],
})
export class PatientComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'age', 'birthday', 'address'];
  dataSource = ELEMENT_DATA;
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private patientsService: PatientsService,
  ) { }

  ngOnInit(): void {
    // this.patientsService.getAll({})
    //   .subscribe(
    //     console.log,
    //     console.error,
    //     console.info,
    //   );
    //   console.log(Math.random());

    // this.sort?.sortChange.subscribe(() => this.paginator!.pageIndex = 0);

    // merge(this.sort!.sortChange, this.paginator!.page)
    //   .pipe(
    //     startWith({}),
    //     switchMap(() => {
    //       return this.patientsService.getAll({
    //         sort  : this.sort?.active,
    //         order : this.sort?.direction,
    //         offset: this.paginator?.pageIndex,
    //       })
    //         .pipe(catchError(() => of([])));
    //     }),
    //     map((data: any) => {
    //       this.resultsLength = data.length;
    //       return data;
    //     }),
    //   ).subscribe(data => this.dataSource = data);
  }

  ngAfterViewInit() {
  }
}
