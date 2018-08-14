import { Component } from '@angular/core';
import { ProfileComponent} from './profile/profile.component';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient, private ws: WebsocketService) {}

  ngOnInit() {
    this.getAds();
    console.log(this.works);
    this.ws.connect().subscribe(()=> {
      this.ws.getNumberOfUnreadedMessages().subscribe( msg => {
        this.unreadmessages = JSON.parse(msg.body);
      })
    })
    this.initWs();
  }
  stompclient;
  title = 'SzakiCool Website';
  login = false;
  isLoggedin: boolean;
  works;
  show;
  str: string;
  unreadmessages;

  handlePush() {

  }
  
  initWs() {
    let that = this;
    this.stompclient.connect({}, connected=> {
      this.stompclient.subscribe("/user/unreadMessages/", (msg) => {
        that.unreadmessages = msg;
        console.log(msg);
      })
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
}
