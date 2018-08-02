import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-adslist',
  templateUrl: './adslist.component.html',
  styleUrls: ['./adslist.component.css']
})
export class AdslistComponent implements OnInit {

  works;
  show;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    if (sessionStorage.getItem("user") == null) {
      this.router.navigate(["/"]);
    }
    this.getAds();
  }

  getAds() {
    this.http.get("api/works/simple").subscribe((works)=> {this.works = works});
  }

}
