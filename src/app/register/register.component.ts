import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient) { }

  username;
  password;

  isAvailable:boolean = true;

  ngOnInit() {
  }

  register() {
    this.http.post("api/register", {username:this.username, password:this.password}).subscribe(console.log);
  }

  testName() {
    this.http.get('api/users/check/' + this.username).subscribe(resp => {
      if (resp) {
        this.isAvailable = false;
      }
      else {
        this.isAvailable = true;
      }
    });
  }

}