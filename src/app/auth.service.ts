import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './user';
import { LoginDetails } from './login-details';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getAuth(loginDetails: LoginDetails): Observable<User> {
    let headers = new HttpHeaders({
      'Authorization': 'Basic ' + window.btoa(loginDetails.username + ':' + loginDetails.password)
    });
    return this.http.get<User>('/api/auth', {
      headers: headers
    });
  }

  deleteAuth(): Observable<void> {
    return this.http.delete<void>('/api/auth');
  }
}