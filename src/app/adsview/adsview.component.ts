import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AdsdetailsService } from '../adsdetails.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adsview',
  templateUrl: './adsview.component.html',
  styleUrls: ['./adsview.component.css']
})
export class AdsviewComponent implements OnInit {

  work;
  smallPicUrl;
  bigPicEl;
  bigPic;

  constructor(
    private router: Router,
    private http : HttpClient,
    private service : AdsdetailsService
  ) {}

  ngOnInit() {
    if (sessionStorage.getItem("user") == null) {
      this.router.navigate(["/login"]);
    }

    this.work = this.service.work;
    this.requestWork();
    console.log(this.work);
    this.work.userRating = Math.round(this.work.userRating * 10) / 10; 
  }

  requestWork() {
    this.http.get("api/works/" + this.work.id).subscribe((work)=>{this.work = work; console.log(work); this.bigPic = this.work.links[0]});
  }

  changeBigPic(pic) {
    this.bigPic = pic;
  }

}
