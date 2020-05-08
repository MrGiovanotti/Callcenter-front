import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ConstantsUtils } from '../utils/constants.utils';
import { Observable } from 'rxjs';
import { Authority } from '../models/authority.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  URL: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.URL = ConstantsUtils.BACKEND_URL.concat('/authority');
  }

  getAuthorities(): Observable<any> {
    let action = '/notadminroles';
    if (this.auth.isAdmin()) {
      action = '/index';
    }
    return this.http.get<any>(this.URL.concat(action));
  }

}
