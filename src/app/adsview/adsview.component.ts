import { Component, OnInit, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AdsdetailsService } from '../adsdetails.service';
import { HttpClient } from '@angular/common/http';
import { ClockserviceService } from '../clockservice.service';


@Component({
  selector: 'app-adsview',
  templateUrl: './adsview.component.html',
  styleUrls: ['./adsview.component.css']
})
export class AdsviewComponent implements OnInit {

  @Input() work;
  @Input() works;
  workDetails;
  smallPicUrl;
  bigPicEl;
  bigPic;
  favourite = {};
  isContactValid = true;


  constructor(
    private router: Router,
    private http : HttpClient,
    private service : AdsdetailsService,
    private clockservice: ClockserviceService
  ) {}

  ngOnInit() {
    if (sessionStorage.getItem("user") == null) {
      this.router.navigate(["/login"]);
    }

    this.work = this.service.work;
    this.requestWork();
    this.getWorkDetailDto();
    this.isFavourite();
    

  }

  public getUserId() {
    let userString = sessionStorage.getItem("user");
    let userObject = JSON.parse(userString);
    let userId = JSON.stringify(userObject.id);
    return userId;
}

  isFavourite() {
    let userId = this.getUserId();
    this.http.get("api/works/isfavourite/" + userId + "/" + this.work.id).subscribe((favourite)=> {this.favourite = favourite;
      console.log(this.favourite);
    this.showFavourite()});
  }

  showFavourite() {
    if (this.favourite) {
      this.favourite = false;
    }else {
      this.favourite = true;
    }
  }

  requestWork() {
    this.http.get("api/works/works/" + this.work.id).subscribe((work)=>{
      this.work = work;
      this.clockservice.workFull = work;
      this.bigPic = this.work.links[0];
      this.work.userRating = Math.round(this.work.userRating * 10) / 10;
    });
  }

  addFavourite() {
    let userId = this.getUserId();
    this.http.get("api/works/add/favourite/" + userId + "/" + this.work.id).subscribe((favourite)=> {this.favourite = favourite;
      console.log(this.favourite);
    this.showFavourite()});
  }

  removeFavourite() {
    let userId = this.getUserId();
    this.http.get("api/works/remove/favourite/" + userId + "/" + this.work.id).subscribe((favourite)=> {this.favourite = favourite;
      console.log(this.favourite);
    this.showFavourite()});
  }

  getWorkDetailDto(){
    this.http.get('api/works/details/' + this.work.id).subscribe(workDetails => {
      this.workDetails = workDetails;
      if (this.workDetails.userId === JSON.parse(sessionStorage.getItem('user')).id) {
        this.isContactValid = false;
      }
    });
  }


  changeBigPic(pic) {
    this.bigPic = pic;
  }

  contactable() {
    if (this.isContactValid) { return true; } else { return false; }

  }
}
