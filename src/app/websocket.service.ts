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

  connect(callback) {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, connected => {
      that.onConnect();
    });
  }

  onConnect() {
    let that = this;
    this.stompClient.subscribe("/user/reply/", (message) => {
      that.messages.push(JSON.parse(message.body));
    });
  }

  getStompClient() {
    let ws = new SockJS(this.serverUrl);
    return Stomp.over(ws);
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

  updateMessage(id) {
    this.stompClient.send('/app/updateMessage' , {}, {"id":id});
  }
}
