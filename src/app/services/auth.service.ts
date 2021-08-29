import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { headers } from '../utils/contants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL: string = environment.apiURL;
  constructor(
    private http: HttpClient,
  ) { }

  login(usn: string, pwd: string) {
    return this.http.post(`${this.apiURL}/accessToken`, {
      usn,
      pwd,
    }, {
      headers,
    }).pipe(
      delay(1000),
    );
  }

  verifyToken(accessToken: string) {
    return this.http.post(`${this.apiURL}/verify`, {
      accessToken,
    }, {
      headers,
    });
  }
}
