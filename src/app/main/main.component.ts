import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  works;
  show;
  str: string;

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

  search() {
    this.http.get("api/works/search/" + this.str).subscribe((works)=> {this.works = works;
    console.log(this.works)});
  }
}