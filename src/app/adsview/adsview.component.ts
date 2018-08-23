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

  }

  requestWork() {
    this.http.get("api/works/works/" + this.work.id).subscribe((work)=>{
      this.work = work;
      this.clockservice.workFull = work;
      this.bigPic = this.work.links[0];
      this.work.userRating = Math.round(this.work.userRating * 10) / 10;
    });
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
