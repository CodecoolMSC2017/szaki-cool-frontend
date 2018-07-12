import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GreetingsService {

  constructor(private http: HttpClient) {
  }

  getGreetings() : Observable<any> {
    return this.http.get("http://localhost:8080/rest/greetings");
  }

  addNewGreeting(newGreeting) : Observable<any> {
    return this.http.post("http://localhost:8080/rest/greetings", newGreeting);
  }

  deleteGreeting(greetingId) {
    return this.http.delete("http://localhost:8080/rest/greetings/" + greetingId);
  }
}
