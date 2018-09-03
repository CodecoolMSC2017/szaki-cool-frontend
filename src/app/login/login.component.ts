import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { LoginDetails } from '../login-details';
import { Route, Router } from '@angular/router';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private authService: AuthService, 
    private router: Router,
    private ws : WebsocketService
  ) { }

  loginDetails: LoginDetails = new LoginDetails();
  loggedin: boolean;
  error;

  ngOnInit() {
  }

  getAuth() {
    this.authService.getAuth(this.loginDetails).subscribe(user => {
      sessionStorage.setItem('user', JSON.stringify(user));
      this.loggedin = true;
      this.ws.loggedin();
      this.router.navigate(["/main"]);
    }, error => {this.handleError(error)});
  }

  handleError(error) {
    if (error.status == 401) {
      this.error = "invalid username or password";
    }
  }

  


  keyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.getAuth();
    }
  }

}
