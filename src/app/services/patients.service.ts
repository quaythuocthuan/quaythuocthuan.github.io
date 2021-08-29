import { CookieService } from 'ngx-cookie-service';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Patient } from '../models/patient';
import { headers } from '../utils/contants';
import { PageInfo, SearchReponsePayload } from '../utils/types';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private base = 'patients'
  private apiURL: string = environment.apiURL;
  private accessToken = '';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {
    this.accessToken = `Bearer ${this.cookieService.get(btoa('accessToken'))}`;
  }

  getAll({
    sort,
    order = 'desc',
    offset = 0,
    limit = 20,
  }: PageInfo) {
    return this.http.get<SearchReponsePayload<Patient[]>>(`${this.apiURL}/${this.base}`, {
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

  findById(id: number) {
    return this.http.get<Patient>(`${this.apiURL}/${this.base}/${id}`, {
      headers: {
        ...headers,
        authorization: this.accessToken,
      },
    });
  }

  create(data: Patient) {
    return this.http.post<Patient>(`${this.apiURL}/${this.base}`, data, {
      headers: {
        ...headers,
        authorization: this.accessToken,
      },
    });
  }

  update(id: string, data: Partial<Patient>) {
    return this.http.patch(`${this.apiURL}/${this.base}/${id}`, data, {
      headers: {
        ...headers,
        authorization: this.accessToken,
      },
    });
  }

  delete(id: string) {
    return this.http.delete(`${this.apiURL}/${this.base}/${id}`, {
      headers: {
        ...headers,
        authorization: this.accessToken,
      },
    });
  }
}
