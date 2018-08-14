import { Component, OnInit, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AdsdetailsService } from '../adsdetails.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adsview',
  templateUrl: './adsview.component.html',
  styleUrls: ['./adsview.component.css']
})
export class AdsviewComponent implements OnInit {

  @Input() work;
  works;
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
    this.work.userRating = Math.round(this.work.userRating * 10) / 10;
  }

  requestWork() {
    this.http.get("api/works/works/" + this.work.id).subscribe((work)=>{
      this.work = work;
      this.bigPic = this.work.links[0]
    });
  }


  changeBigPic(pic) {
    this.bigPic = pic;
  }

  getAds() {
    this.http.get("api/works/works/id").subscribe((works)=> {this.works = works});
  }

}
