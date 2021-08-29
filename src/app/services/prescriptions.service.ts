import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Prescription } from '../models/prescription';
import { headers } from '../utils/contants';
import { PageInfo, SearchReponsePayload } from '../utils/types';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionsService {
  private apiURL: string = environment.apiURL;
  private base = 'prescriptions';
  private accessToken = '';

  constructor(
    protected http: HttpClient,
    private cookieService: CookieService,
  ) {
    this.accessToken = `Bearer ${this.cookieService.get(btoa('accessToken'))}`;
  }

  create({
    patientId,
    diagnostic,
  }: Partial<Prescription>) {
    return this.http.post<Prescription>(`${this.apiURL}/patients/${patientId}/${this.base}`, {
      diagnostic,
    }, {
      headers: {
        ...headers,
        authorization: this.accessToken,
      },
    });
  }

  getByPatient(patientId: any, {
    sort = 'updatedAt',
    order = 'desc',
    offset = 0,
    limit = 20,
  }: PageInfo) {
    return this.http.get<SearchReponsePayload<Prescription[]>>(`${this.apiURL}/patients/${patientId}/${this.base}`, {
      headers: {
        ...headers,
        'page-sort-by': `${sort || ''}`,
        'page-order'  : order,
        'page-offset' : offset.toString(),
        'page-limit'  : limit.toString(),
        authorization : this.accessToken,
      },
    });
  }

  findById(patientId: any, prescriptionId: any) {
    return this.http.get<Prescription>(`${this.apiURL}/patients/${patientId}/${this.base}/${prescriptionId}`, {
      headers: {
        ...headers,
        authorization: this.accessToken,
      },
    });
  }

  update({
    id,
    patientId,
  }: any, data: Partial<Prescription>) {
    return this.http.patch(`${this.apiURL}/patients/${patientId}/${this.base}/${id}`, data, {
      headers: {
        ...headers,
        authorization: this.accessToken,
      },
    });
  }

  delete({
    id,
    patientId,
  }: any) {
    return this.http.delete(`${this.apiURL}/patients/${patientId}/${this.base}/${id}`, {
      headers: {
        ...headers,
        authorization: this.accessToken,
      },
    });
  }
}
