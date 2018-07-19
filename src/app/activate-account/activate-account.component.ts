import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  activationCode: string;
  status;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  sendActivation() {
      this.http.post('api/account', {activationCode: this.activationCode}).subscribe(
        
      error =>{
          this.status = "Activation code seems to be not valid"
      },
      success => {
        console.log(success);
        this.status = "Your account has been activated";
        console.log("sadasd");
        this.router.navigate(["/login"])
      })
  }

}
