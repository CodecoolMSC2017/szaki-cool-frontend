import { Component, OnInit, Input } from '@angular/core';
import { AdsviewComponent} from '../adsview/adsview.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adspreview',
  templateUrl: './adspreview.component.html',
  styleUrls: ['./adspreview.component.css']
})
export class AdspreviewComponent implements OnInit {

  @Input() work;
  imglink;
  profileImage;

  constructor() { }

  ngOnInit() {
    console.log(this.work)
    this.imglink = "api/pics/" + this.work.workImgUrl;  
    this.profileImage = "api/pics/" + this.work.userImgUrl;
    this.work.userRating = Math.round(this.work.userRating * 10) / 10; 
  }

  loggedin() {
    if (sessionStorage.getItem("user") != null) { return true; }
    else { return false; }
  }

}
