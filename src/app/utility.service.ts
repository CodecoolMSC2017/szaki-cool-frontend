import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private http: HttpClient) { }

  numberOfUnreadedMessages;


  getMessages() {
    
    return this.numberOfUnreadedMessages;
  }

  RequestMsg(userId) {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    this.http.get('api/unreadMessage/' + userId).subscribe(msg=> {
      this.numberOfUnreadedMessages = msg;
    });
  }
}
