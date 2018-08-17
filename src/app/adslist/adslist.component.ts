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
  str: string;
  searching: boolean;
  category;
  min;
  max;
  minRating;
  maxRating;
  categories;
  minMessage;
  maxMessage;
  minRatingMessage;
  maxRatingMessage;
  pricesMessage;
  ratingsMessage;

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

  showSearch() {
    if (this.searching) {
      this.searching = false;
    }
    else {
      this.searching = true;
      this.getCategories();
    }
  }

  checkMinNumber(): void {
    for(let i in this.min){
      if (this.min[i].match(/\d/)) {
        this.minMessage = null;
      } else {
        this.minMessage = 'Only numbers';
        break;
      }
    }
  }

  checkMaxNumber(): void {
    if (this.max == null) {
      this.maxMessage = null;
    } else {
      for(let i in this.max){
        if (this.max[i].match(/\d/)) {
          this.maxMessage = null;
        } else {
          this.maxMessage = 'Only numbers';
          break;
        }
      }
    }
  }

  checkMinRating(): void {
    for(let i in this.minRating){
      if (this.minRating[i].match(/\d/)) {
        this.minRatingMessage = null;
      } else {
        if(this.minRating[i] === ".")
        {
          continue;
        } else {
          this.minRatingMessage = 'Only numbers or dot';
          break;
        }
      }
    }
  }

  checkMaxRating(): void {
    if (this.max == null) {
      this.maxMessage = null;
    } else {
      for(let i in this.maxRating){
        if (this.maxRating[i].match(/\d/)) {
          this.maxRatingMessage = null;
        } else {
          if(this.maxRating[i] === ".")
          {
            continue;
          } else {
            this.maxRatingMessage = 'Only numbers or dot';
            break;
          }
        }
      }
    }
  }

  checkPrices() {
    if(this.min > this.max) {
      this.pricesMessage = 'Minimum should be lower or equals than Maximum'
    } else {
      this.pricesMessage = null;
    }
  }

  checkRatings() {
    if(this.minRating > this.maxRating) {
      this.ratingsMessage = 'Minrating should be lower or equals than Maxrating'
    } else {
      this.ratingsMessage = null;
    }
  }

  getAds() {
    this.http.get("api/works/simple").subscribe((works)=> {this.works = works});
  }

  getCategories() {
    this.http.get("api/works/categories").subscribe((categories)=> {this.categories = categories;
    console.log(this.categories)});
  }

  search() {
    this.http.get("api/works/search/" + this.str).subscribe((works)=> {this.works = works;
    console.log(this.works)});
  }

  advancedSearch() {
    if(this.category == null || this.category == "") {
      this.category = null;
    }
    if(this.min == null || this.min == "") {
      this.min = null;
    }
    if(this.max == null || this.max == "") {
      this.max = null;
    }
    if(this.minRating == null || this.minRating == "") {
      this.minRating = null;
    }
    if(this.maxRating == null || this.maxRating == "") {
      this.maxRating = null;
    }
    this.http.get("api/works/search/" + this.category+"/"+this.min+"/"+this.max+"/"+this.minRating+"/"+this.maxRating).subscribe((works)=> {this.works = works;
      console.log(this.works)});


  }
}