import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { LoginDetails } from '../login-details';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private authService: AuthService, 
    private router: Router
  ) { }

  loginDetails: LoginDetails = new LoginDetails();
  loggedin: boolean;

  ngOnInit() {
  }

  login() {
    this.http.post("api/login", {username:this.loginDetails.username, password:this.loginDetails.password}).subscribe(console.log);
  }

  getAuth() {
    this.authService.getAuth(this.loginDetails).subscribe(user => {
      sessionStorage.setItem('user', JSON.stringify(user));
      this.loggedin = true;
      this.router.navigate(["/main"]);
    }, error => alert(error.message));
  }

  keyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.getAuth();
    }
  }

}
