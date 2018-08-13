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
  stompClient;
  ownMessage;
  myName;
  myPartnerName;

  ngOnInit() {
    let that = this;
    this.stompClient = this.ws.getStompClient();
    this.stompClient.connect({}, connected => { 
      this.init();
      this.stompClient.subscribe("/user/reply/", (message) => {
        that.messegeReceived(message);
      });
    });
    
  }

  init() {
    this.destinationId = +this.route.snapshot.paramMap.get('id'); 
    let myId = JSON.parse(sessionStorage.getItem("user")).id;
    this.http.get('api/conversation/' + myId + "/" + this.destinationId).subscribe(messages => {
      this.convertMessage(this, messages);
    });
    this.getUserName(this.destinationId).subscribe( msg => {
      this.myPartnerName = (msg as any).username;
    });
  }

  getUserName(id) {
    return this.http.get("api/users/" + id);
  }

  convertMessage(that, messages) {
    messages.forEach(message => {
      console.log(message);
      message.date = new Date(message.date);
      if (message.seen === false) {
        this.sendSeen(message.id);
      }
      that.getUserName(message.senderId).subscribe( msg => {
        message.username = (msg as any).username;
      });
      that.messages.push(message);
    });
  }

  sendMessage() {
    let message = new Message;
    message.date = new Date().getTime();
    message.message = this.chatText;
    message.receiverId = this.destinationId;
    message.senderId = JSON.parse(sessionStorage.getItem("user")).id;
    message.seen = false;
    //this.ws.sendMessage(message);
    this.stompClient.send('/app/lobby' ,{}, JSON.stringify(message));
    this.chatText = "";
  }

  messegeReceived(message) {
    let parsedMessage = JSON.parse(message.body);
    if (parsedMessage.receiverId != this.destinationId) {
      this.sendSeen(parsedMessage);
    }
    parsedMessage.date = new Date(parsedMessage.date);
    this.getUserName(parsedMessage.senderId).subscribe( msg => {
      parsedMessage.username = (msg as any).username;
    })
    this.messages.push(parsedMessage);
  }

  sendSeen(message) {
    this.stompClient.send('/app/updateMessage' , {}, JSON.stringify(message));
  }


  keyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  }

  sendNewMessage() {
      this.sendMessage();
  }

  isOwnMessage(message) {
    if (message.senderId == 1) {
      this.ownMessage = true;
    }
    else {
      this.ownMessage = false;
    }
  }

}
