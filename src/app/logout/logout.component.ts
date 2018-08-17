import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private ws: WebsocketService
  ) { }

  ngOnInit() {
    this.logout();
  }

  logout() {
    this.authService.deleteAuth().subscribe(user => {
      sessionStorage.clear();
      this.ws.disconnect();
    }, error => alert(error.message));
  }

}
