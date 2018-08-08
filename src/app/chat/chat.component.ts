import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { Message } from '../message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private ws: WebsocketService) { }

  chatText;
  destinationId;

  messages : Message[];

  ngOnInit() {
    this.ws.connect();
    this.messages = this.ws.messages;
  }

  sendMessage() {
    let message = new Message;
    message.date = new Date;
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
