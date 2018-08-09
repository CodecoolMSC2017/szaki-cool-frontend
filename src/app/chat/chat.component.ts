import { Component, OnInit, Input } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { Message } from '../message';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(
    private ws: WebsocketService,
    private http: HttpClient,
    private route:ActivatedRoute
  ) { }

  chatText;
  destinationId;
  messages = [];

  ngOnInit() {
    this.destinationId = +this.route.snapshot.paramMap.get('id');
    this.ws.connect();
    this.messages = this.ws.messages;
    let myId = JSON.parse(sessionStorage.getItem("user")).id;
    this.http.get('api/conversation/' + myId + "/" + "2").subscribe(messages => {
      //this.messages = messages;
      this.convertMessage(this, messages);
    });
  }

  convertMessage(that, messages) {
    messages.forEach(message => {
      console.log(message);
      message.date = new Date(message.date);
      that.messages.push(message);
    });
  }

  getMessageHistory() {
    this.http.get
  }

  sendMessage() {
    let message = new Message;
    message.date = new Date().getTime();
    message.message = this.chatText;
    message.receiverId = this.destinationId;
    message.senderId = JSON.parse(sessionStorage.getItem("user")).id;
    this.ws.sendMessage(message);
    this.chatText = "";
  }

  keyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  }

}
