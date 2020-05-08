import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBase } from 'src/app/form.base';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ConstantsUtils } from 'src/app/utils/constants.utils';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends FormBase implements OnInit {

  authenticationFailed = false;
  sending = false;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private element: ElementRef) {
    super();
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate([ConstantsUtils.DASHBOARD_ROUTE]);
    }
  }

  login() {
    if (this.form.invalid) {
      return;
    }
    this.sending = true;
    this.authenticationFailed = false;
    const username = this.form.value.username;
    const password = this.form.value.password;
    this.auth.login(username, password).subscribe(data => {
      this.auth.saveTokenAndImage(data.access_token);
      this.router.navigate([ConstantsUtils.DASHBOARD_ROUTE]);
    }, error => {
      this.authenticationFailed = true;
      this.element.nativeElement.querySelector('#username').focus();
      this.form.reset();
      this.sending = false;
    });
  }

}
