import { Component, OnInit, Input } from '@angular/core';
import { AdsviewComponent} from '../adsview/adsview.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdsdetailsService } from '../adsdetails.service';

@Component({
  selector: 'app-adspreview',
  templateUrl: './adspreview.component.html',
  styleUrls: ['./adspreview.component.css']
})
export class AdspreviewComponent implements OnInit {

  @Input() work;
  imglink;
  profileImage;

  constructor(
    private router: Router,
    private service : AdsdetailsService
  ) {}

  ngOnInit() {
    this.imglink = "api/pics/" + this.work.workImgUrl;  
    this.profileImage = "api/pics/" + this.work.userImgUrl;  
  }

  loggedin() {
    if (sessionStorage.getItem("user") != null) { return true; }
    else { return false; }
  }
  
  navigateDetailedView() {
    this.service.work = this.work;
    this.router.navigate(["/adsview"]);
    this.work.userRating = Math.round(this.work.userRating * 10) / 10; 
  }

}
