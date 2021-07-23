import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Patient } from '../models/patient';
import { headers } from '../utils/contants';
import { PageInfo } from '../utils/types';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private base = 'patients'
  private apiURL: string = environment.apiURL;

  constructor(
    private http: HttpClient,
  ) { }

  getAll({
    sort,
    order = 'desc',
    offset = 0,
    limit = 20,
  }: PageInfo) {
    return this.http.get<Patient[]>(`${this.apiURL}/${this.base}`, {
      headers: {
        ...headers,
        'page-sort-by': `${sort || ''}`,
        'page-order'  : order,
        'page-offset' : offset.toString(),
        'page-limit'  : limit.toString(),
      },
    });
  }

  create(data: Patient) {
    return this.http.post<Patient>(`${this.apiURL}/${this.base}`, data, {
      headers,
    });
  }
}
