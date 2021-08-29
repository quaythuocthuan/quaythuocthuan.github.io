import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PrescriptionDetails } from '../models/prescription';
import { headers } from '../utils/contants';
import { PageInfo, SearchReponsePayload } from '../utils/types';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionsDetailsService {
  private apiURL: string = environment.apiURL;
  private base = 'details';

  constructor(
    protected http: HttpClient,
  ) { }

  create(patientId: any, data: PrescriptionDetails) {
    return this.http.post<PrescriptionDetails>(
      `${this.apiURL}/patients/${patientId}/prescriptions/${data.prescriptionId}/${this.base}`,
      data,
      {
        headers,
      },
    );
  }

  getPrescriptionDetails({
    patientId,
    prescriptionId,
    sort = '',
    order = 'desc',
    offset = 0,
    limit = 20,
  }: PageInfo & { patientId: any, prescriptionId: any }) {
    return this.http.get<SearchReponsePayload<PrescriptionDetails[]>>(`${this.apiURL}/patients/${patientId}/prescriptions/${prescriptionId}/${this.base}`, {
      headers: {
        ...headers,
        'page-sort-by': sort,
        'page-order'  : order,
        'page-offset' : offset.toString(),
        'page-limit'  : limit.toString(),
      },
    });
  }

  update({
    id,
    patientId,
    prescriptionId,
  }: any, data: Partial<PrescriptionDetails>) {
    return this.http.patch(`${this.apiURL}/patients/${patientId}/prescriptions/${prescriptionId}/details/${id}`, data, {
      headers,
    });
  }

  delete({
    id,
    patientId,
    prescriptionId,
  }: any) {
    return this.http.delete(`${this.apiURL}/patients/${patientId}/prescriptions/${prescriptionId}/details/${id}`, {
      headers,
    });
  }
}
