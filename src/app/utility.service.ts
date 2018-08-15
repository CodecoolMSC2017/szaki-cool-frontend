import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private http: HttpClient) { }

  private loggedInObservable = new Subject<any>();
  leggedIn$ = this.loggedInObservable.asObservable();


  loggedin() {
    this.loggedInObservable.next();
  }

  loginSucces() {
    return this.loggedInObservable;
  }
  
}
