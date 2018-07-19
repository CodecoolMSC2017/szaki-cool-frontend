import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SzakiCool Website';
  login = false;
  isLoggedin: boolean;

  loginClicked() {
    this.login = true;
  }

  loggedin() {
    if (sessionStorage.getItem("user") != null) { return true; }
    else { return false; }
  }

}
