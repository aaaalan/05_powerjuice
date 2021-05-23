import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { retry } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { UserStoreService } from './user-store.service';
//npm install --save-dev jwt-decode
interface Token {
  exp: number;
  user: {
    id: string;
  };
}
@Injectable()
export class AuthenticationService {
  private userNameStorage = new Subject<String>();

  private api: string =
    'https://powerjuice.s1810456011.student.kwmhgb.at/api/auth';
  //'http://localhost:8080/api/auth';
  constructor(private http: HttpClient, private us: UserStoreService) {}
  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }
  public getCurrentUserId() {
    return Number.parseInt(localStorage.getItem('userId'));
  }
  public setLocalStorage(token: string) {
    console.log('Storing token');
    console.log(jwt_decode(token));
    const decodedToken = jwt_decode(token) as Token;
    console.log(decodedToken);
    console.log(decodedToken.user.id);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', decodedToken.user.id);

    this.us.getSingle(+localStorage.getItem('userId')).subscribe(res => {
      this.setItem('firstName', res.firstName);
      this.setItem('isAdmin', res.isAdmin);
      //localStorage.setItem('firstName', res.firstName);

      console.log(res.firstName);
    });
  }
  logout() {
    this.http.post(`${this.api}/logout`, {});
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.removeItem('firstName');
    //localStorage.removeItem('firstName');
    //this.userNameStorage.next('changed');
    console.log('logged out');
  }
  public isLoggedIn() {
    if (localStorage.getItem('token')) {
      let token: string = localStorage.getItem('token');
      //console.log(token);
      //console.log(jwt_decode(token));
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if (expirationDate < new Date()) {
        console.log('token expired');
        localStorage.removeItem('token');
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
  isLoggedOut() {
    return !this.isLoggedIn();
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    this.userNameStorage.next('changed');
  }

  removeItem(key) {
    localStorage.removeItem(key);
    this.userNameStorage.next('changed');
  }
}
