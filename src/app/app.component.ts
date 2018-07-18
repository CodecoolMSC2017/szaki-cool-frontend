import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SzakiCool Website';
  login = false;

loginClicked() {
  this.login = true;
}

}
