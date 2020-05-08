import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ConstantsUtils } from '../utils/constants.utils';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(e => {
        if (e.status === 401) {
          if (this.authService.isAuthenticated()) {
            this.authService.logout();
          }
          this.router.navigate([ConstantsUtils.LOGIN_ROUTE]);
        }

        if (e.status === 403) {
          this.router.navigate([ConstantsUtils.FORBIDDEN_ROUTE]);
        }

        if (e.status === 404) {
          this.router.navigate([ConstantsUtils.NOT_FOUND_ROUTE]);
        }
        return throwError(e);
      })
    );
  }
}
