import { Component } from '@angular/core';
import { ProfileComponent} from './profile/profile.component'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAds();
    console.log(this.works);
  }

  title = 'SzakiCool Website';
  login = false;
  isLoggedin: boolean;
  works;
  show;
  

  loginClicked() {
    this.login = true;
  }

  loggedin() {
    if (sessionStorage.getItem("user") != null) { return true; }
    else { return false; }
  }

  getAds() {
    this.http.get("api/works").subscribe((works)=> {this.works = works});
  }

  dropdownMenu() {
    if (this.show == true) {
      this.show = false;
    }
    else {
      this.show = true;
    }
  }

}
