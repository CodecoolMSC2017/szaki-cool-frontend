import { Component } from '@angular/core';
import { ProfileComponent} from './profile/profile.component';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from './websocket.service';
import { UtilityService } from './utility.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private http: HttpClient,
    private ws: WebsocketService,
    private utility: UtilityService
  ) {}

  ngOnInit() {
    this.getAds();
    this.utility.loginSucces().subscribe(()=> {
      this.ws.init();
      this.requestMsg(this.user.id);
    });
    this.ws.connect().subscribe(this.subscribeCallback.bind(this));
  }
  
  user = JSON.parse(sessionStorage.getItem("user"));
  loginSucces;
  title = 'SzakiCool Website';
  login = false;
  isLoggedin: boolean;
  works;
  show;
  str: string;
  unreadmessages;

  subscribeCallback() {
    this.ws.getNumberOfUnreadedMessages().subscribe( msg => {
      this.unreadmessages = JSON.parse(msg.body);
    })
  }


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
    if (this.show == true) {
      this.show = false;
    }
    else {
      this.show = true;
    }
  }

  search() {
    this.http.get("api/works/search/" + this.str).subscribe((works)=> {this.works = works;
    console.log(this.works)});
  }

  requestMsg(userId) {
    this.http.get('api/unreadMessage/' + userId).subscribe(msg=> {
      this.unreadmessages = msg;
    });
  }
}
