import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {

  constructor(private http: HttpClient) { }

  private serverUrl = 'http://localhost:4200/api/socket';
  private stompClient;
  private messageSource = new Subject<any>();
  private unreadedMessages = new Subject<any>();
  private typeStatus = new Subject<any>();
  private loggedInObservable = new Subject<any>();
  leggedIn$ = this.loggedInObservable.asObservable();
  message$ = this.messageSource.asObservable();
  unread$ = this.unreadedMessages.asObservable();
  type$ = this.typeStatus.asObservable();

  loggedin() {
    this.init();
  }

  loginSucces() {
    return this.loggedInObservable;
  }

  init() {
    let that = this;
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, connected => {
      this.stompClient.subscribe("/user/reply/", (message) => {
        let parsedMessage = JSON.parse(message.body);
        if (parsedMessage.type == "message") {
          console.log("type message");
          that.putMessage(message);
        }

        else if (parsedMessage.type == "typing") {
          console.log("type typing");
          that.putType(message);

        }
        else {
          console.log("type other");
          that.putUnreadCount(message);
      }});
      this.loggedInObservable.next();  
    });
  }

  disconnect() {
    this.stompClient.disconnect(()=> {
      this.stompClient = null;
    }, {});
  }

  private putType(message) {
    this.typeStatus.next(message);
  }

  private putMessage(message) {
    this.messageSource.next(message);
  }

  private putUnreadCount(message) {
    this.unreadedMessages.next(message);
  }


  getMessage() {
    return this.messageSource;
  }

  getTypeStatus() {
    return this.typeStatus;
  }

  getNumberOfUnreadedMessages() {
    return this.unreadedMessages;
  }

  sendMessage(message) {
    this.stompClient.send("/app/lobby", {},JSON.stringify(message));
  }

  sendSeen(message) {
    this.stompClient.send('/app/updateMessage' , {}, JSON.stringify(message));
  }

  sendTypeStatus(message) {
    this.stompClient.send('/app/typing', {}, JSON.stringify(message));
  }
}
