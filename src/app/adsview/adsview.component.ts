import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-adsview',
  templateUrl: './adsview.component.html',
  styleUrls: ['./adsview.component.css']
})
export class AdsviewComponent implements OnInit {

  smallPicUrl;
  bigPicEl;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    if (sessionStorage.getItem("user") == null) {
      this.router.navigate(["/login"]);
    }
  }

  changePic(imageNumber) {
    this.smallPicUrl = document.getElementById("smallPic" + imageNumber).getAttribute("src");
    this.bigPicEl = document.getElementById("bigPic");

    this.bigPicEl.style = "background: url("+this.smallPicUrl+");" + 
    "background-size: auto 100%;" + 
    "background-position: center center;" + 
    "background-repeat: no-repeat;";
  }

}
