import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { Message } from '../message';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
 

  constructor(
    private ws: WebsocketService,
    private http: HttpClient,
    private route:ActivatedRoute
  ) { }

  chatText;
  destinationId;
  messages = [];
  ownMessage;
  myName;
  myPartnerName;
  typeStatus :boolean;
  myId;

  msgSubscription : Subscription;
  typeSubscription : Subscription;


  ngOnInit() {
    this.init();
    this.msgSubscription = this.ws.getMessage().subscribe( message=>{
      this.messegeReceived(message);
    });
    this.typeSubscription = this.ws.getTypeStatus().subscribe( message=> {
      this.typeStatus = (JSON.parse(message.body)).typing;
    })
  }

  ngOnDestroy(): void {
    this.msgSubscription.unsubscribe();
    this.typeSubscription.unsubscribe();
  }

  

  init() {
    this.destinationId = +this.route.snapshot.paramMap.get('id'); 
    this.myId = JSON.parse(sessionStorage.getItem("user")).id;
    this.http.get('api/conversation/' + this.myId + "/" + this.destinationId).subscribe(messages => {
      this.addMessageHistory(messages);
    });
    this.getUserName(this.destinationId).subscribe( msg => {
      this.myPartnerName = (msg as any).username;
    });
  }

  getUserName(id) {
    return this.http.get("api/users/" + id);
  }

  addMessageHistory(messages) {
    messages.forEach(message => {
      this.convertMessage(message);
    });
  }

  messegeReceived(message) {
    let parsedMessage = JSON.parse(message.body);
    this.convertMessage(parsedMessage);
  }

  convertMessage(parsedMessage) {
    let receiverId = parsedMessage.receiverId;  
    if (receiverId == this.myId) {
      this.ws.sendSeen(parsedMessage);
    }
    parsedMessage.date = new Date(parsedMessage.date);
    this.getUserName(parsedMessage.senderId).subscribe( msg => {
      parsedMessage.username = (msg as any).username;
    })
    this.messages.push(parsedMessage);
  }

  sendMessage() {
    let message = new Message;
    message.date = new Date().getTime();
    message.message = this.chatText;
    message.receiverId = this.destinationId;
    message.senderId = JSON.parse(sessionStorage.getItem("user")).id;
    message.seen = false;
    message.type = "message";
    this.ws.sendMessage(message);
    this.sendType(false);
    this.chatText = "";
  }

  sendType(status) {
    let message : any = {};
    message.type = "typing";
    message.senderId = this.myId;
    message.receiverId = this.destinationId;
    message.typing = status;
    this.ws.sendTypeStatus(message);
  }

  
  keyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.sendMessage();
    }
    else {
      if (this.chatText != "") {
        this.sendType(true);
      }
      else {
        this.sendType(false);
      }
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
