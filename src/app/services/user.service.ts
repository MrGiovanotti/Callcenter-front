import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ConstantsUtils } from '../utils/constants.utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL: string;

  constructor(private http: HttpClient,
              private router: Router,
              private auth: AuthService) {
                this.URL = ConstantsUtils.BACKEND_URL.concat('/user');
              }

  getUsers(page: number): Observable<any> {
    let action = '/index/';
    if (this.auth.isAdmin()) {
      action = '/index/admin/';
    }
    return this.http.get<User[]>(this.URL + action + page);
  }

  createUser(user: User): Observable<any> {
    const ACTION = '/create';
    return this.http.post<any>(this.URL.concat(ACTION), user);
  }

  getUser(id: string): Observable<any> {
    let ACTION = '/show/';
    if (this.auth.isAdmin()) {
      ACTION = '/show/admin/';
    }
    return this.http.get(this.URL.concat(ACTION.concat(id)));
  }

  updateUser(user: User): Observable<any> {
    const ACTION = '/update';
    return this.http.put<any>(this.URL.concat(ACTION), user);
  }

  deleteUser(id: number): Observable<any> {
    const ACTION = '/delete/';
    return this.http.delete<any>(this.URL.concat(ACTION, id.toString()));
  }

  usernameExist(username: string): Observable<any> {
    const ACTION = '/exists/'.concat(username);
    return this.http.get<any>(this.URL.concat(ACTION));
  }

  resetPassword(user: User): Observable<any> {
    const ACTION = '/reset-password';
    return this.http.put<any>(this.URL.concat(ACTION), user);
  }

  changePassword(changeData: any): Observable<any> {
    const ACTION = '/change-password';
    return this.http.put<any>(this.URL.concat(ACTION), changeData);
  }

  uploadImage(file: File, id: string): Observable<HttpEvent<{}>> {
    const ACTION = '/upload';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);
    const request = new HttpRequest('POST', this.URL.concat(ACTION), formData, {reportProgress: true});
    return this.http.request(request);
  }

  searchUser(name: string): Observable<any> {
    let ACTION = '/search/';
    if (this.auth.isAdmin()) {
      ACTION = '/search/admin/';
    }
    return this.http.get<any>(this.URL.concat(ACTION, name));
  }

}
