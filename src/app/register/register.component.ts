import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { timeout } from 'q';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private router:Router) { }

  username;
  email;
  password;
  confirmPassword;
  t;

  errorMessage:string = "";
  error;

  ngOnInit() {
    this.t = 3;
  }

  register() {
    this.http.post("api/register", {
      username:this.username,
      email:this.email,
      password:this.password,
      confirmpassword:this.confirmPassword}).subscribe(
        succes => {
          this.errorMessage = "Redirect to login page in .. " + this.t + " seconds";
          setTimeout(this.timeout.bind(this), 1);
        },
        error => {
          this.errorMessage = "Registration Failed!";
        });
  }

  timeout() {
    this.t--;
    this.errorMessage = "Redirect to activation page in .. " + this.t + " seconds";
    if (this.t == 0) {
      this.router.navigate(["/activate"]);
    }
    else {
      setTimeout(this.timeout.bind(this), 1000);
    }
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