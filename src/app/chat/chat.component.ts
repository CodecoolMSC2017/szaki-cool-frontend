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

  messages : Message[];

  ngOnInit() {
    this.ws.connect();
    this.messages = this.ws.getMessages();
  }

}
