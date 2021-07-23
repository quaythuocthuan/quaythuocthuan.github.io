import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Prescription } from '../models/prescription';
import { headers } from '../utils/contants';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionsService {
  private apiURL: string = environment.apiURL;
  constructor(
    private http: HttpClient,
  ) {}

  create(data: Prescription) {
    return this.http.post<Prescription>(`${this.apiURL}/prescriptions`, data, {
      headers,
    });
  }
}
