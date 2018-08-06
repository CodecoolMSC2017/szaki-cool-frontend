import { Component } from '@angular/core';
import { ProfileComponent} from './profile/profile.component';
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
  str: string;
  

  loginClicked() {
    this.login = true;
  }

  loggedin() {
    if (sessionStorage.getItem("user") != null) { return true; }
    else { return false; }
  }

  getAds() {
    this.http.get("api/works/simple").subscribe((works)=> {this.works = works});
  }

  dropdownMenu() {
    console.log(this.str);
    if (this.show == true) {
      this.show = false;
    }
    else {
      this.show = true;
    }
  }

  search() {
    console.log(this.str);
    this.http.get("api/works/search/" + this.str).subscribe((works)=> {this.works = works;
    console.log(works);
    console.log(this.works)});
  }

}
