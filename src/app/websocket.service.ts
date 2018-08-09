import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {

  constructor(private http: HttpClient) { }

  private serverUrl = 'http://localhost:4200/api/socket';
  private stompClient;

  messages = [];

  connect() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, connected => {
      that.onConnect();
    });
  }

  onConnect() {
    this.stompClient.subscribe("/user/reply/", (message) => {
      //that.messages.push(JSON.parse(message.body));
      this.messegeReceived(message);
    });
  }

  messegeReceived(message) {
    let parsedMessage : Message = JSON.parse(message.body);
    parsedMessage.date = new Date(parsedMessage.date);
    this.messages.push(parsedMessage);
  }

  sendMessage(message: Message) {
    this.stompClient.send('/app/lobby' ,{}, JSON.stringify(message));
  }

  getMessages() {
    return this.messages;
  }
}
