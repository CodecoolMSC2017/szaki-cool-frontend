import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) { }

  username;
  password;

  ngOnInit() {
  }

  login() {
    this.http.post("api/login", {username:this.username, password:this.password}).subscribe(console.log);
  }

}
