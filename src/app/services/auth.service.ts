import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ConstantsUtils } from '../utils/constants.utils';
import { Authority } from '../models/authority.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = null;
  private user: User = null;

  private  TOKEN_KEY = 'token';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const ACTION = '/oauth/token';
    const ENDPOINT_URL = ConstantsUtils.BACKEND_URL.concat(ACTION);
    const CREDENTIALS = btoa(ConstantsUtils.CLIENT_ID.concat(':').concat(ConstantsUtils.CLIENT_SECRET));
    const HTTP_HEADERS = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic '.concat(CREDENTIALS)
    });
    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', username);
    params.set('password', password);
    return this.http.post<any>(ENDPOINT_URL, params.toString(), {headers: HTTP_HEADERS});
  }

  saveTokenAndImage(token: string): void {
    this.token = token;
    const image = this.getDataFromToken(token).image;
    localStorage.setItem(this.TOKEN_KEY, token);
    if (image !== null) {
      localStorage.setItem(ConstantsUtils.IMAGE_KEY_FOR_LOCAL_STORAGE, image);
    }
  }

  public get getToken(): string {
    if (this.token === null) {
      this.token = localStorage.getItem(this.TOKEN_KEY);
    }
    return this.token;
  }

  public get getUser(): User {
    if (this.user === null) {
      this.setUserFromToken();
    }
    return this.user;
  }

  getDataFromToken(token: string): any {
    if (token !== null) {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (Exception) {
        return null;
      }
    }
    return null;
  }

  setUserFromToken(): void {
    const payload = this.getDataFromToken(this.getToken);
    if (payload !== null) {
      this.user = new User();
      this.user.id = payload.id;
      this.user.name = payload.name;
      this.user.username = payload.user_name;
      this.user.image = payload.image;
      this.user.authority = {name: payload.authorities[0]} as Authority;
    }
    return null;
  }

  isAuthenticated(): boolean {
    const payload = this.getDataFromToken(this.getToken);
    if (payload !== null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  isTokenExpired(): boolean {
    const token = this.getToken;
    const payload = this.getDataFromToken(token);
    const now = new Date().getTime() / 1000;
    if (payload.exp < now) {
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean {
    if (this.getUser && this.getUser.authority?.name === role) {
      return true;
    }
  }

  isAdmin(): boolean {
    return this.hasRole('ROLE_ADMIN');
  }

  logout(): void {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

}
