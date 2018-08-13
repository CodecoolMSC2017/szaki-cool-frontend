import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  messages = [];
  userId;

  ngOnInit() {
    this.userId = JSON.parse(sessionStorage.getItem("user")).id;
    this.http.get('api/conversation/' + this.userId).subscribe(message => {
      this.convertMessage(this, message);
    });
  }

  navigate(message) {
    console.log(message);
    let id;
    if (this.userId === message.senderId) {
      id = message.receiverId;
    }
    else {
      id = message.senderId;
    }
    this.router.navigate(['chat/' + id]);
  }

  convertMessage(that, messages) {
    messages.forEach(message => {
      console.log(message);
      message.date = new Date(message.date);
      this.getUserName(message.receiverId).subscribe( msg => {
        message.username = (msg as any).username;
      })   
      that.messages.push(message);
    });
  }

  formatDate(long) {
    let date = new Date(long);
    console.log(date.toLocaleDateString());
    let dateInString = date.toLocaleDateString() + " " +  date.toLocaleTimeString();
    return dateInString;
  }

  getUserName(id) {
    return this.http.get("api/users/" + id);
  }

}
