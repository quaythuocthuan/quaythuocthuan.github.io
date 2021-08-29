import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector   : 'app-login',
  templateUrl: './login.component.html',
  styleUrls  : ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  backgroundImage = 'url("https://picsum.photos/1920/1080")';
  isLoading = true;

  public loginForm = this.fb.group({
    usn: ['nthean', Validators.required],
    pwd: ['12345678x@X', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
  ) {
    this.backgroundImage = `url('https://picsum.photos/${window.innerWidth}/${window.innerHeight}')`;
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  loginSubmit() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      const {
        usn,
        pwd,
      } = this.loginForm.value;
      this.authService.login(usn, pwd)
        .subscribe(({ accessToken }: any) => {
          this.cookieService.set(btoa('accessToken'), accessToken);
          this.isLoading = false;
          this.router.navigate(['']);
        });
    }
  }
}
