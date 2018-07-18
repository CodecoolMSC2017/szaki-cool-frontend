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
  email;
  password;
  confirmPassword;

  errorMessage:string = "";

  ngOnInit() {
  }

  register() {
    this.http.post("api/register", {username:this.username, email:this.email, password:this.password, confirmpassword:this.confirmPassword}).subscribe(console.log);
  }

  testName() {
    this.errorMessage = "";
    this.http.get('api/users/check/' + this.username).subscribe(resp => {
      if (resp) {
        this.errorMessage = "This username is already taken";
      }
      else {
        this.errorMessage = "";
      }
    });
  }

  checkPassword() {
    this.errorMessage = "";
    if (this.password != this.confirmPassword) {
      this.errorMessage = "Password should be the same!"
    }
    else {
      this.errorMessage = "";
    }
  }

}