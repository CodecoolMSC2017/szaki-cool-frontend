import { Component, OnInit } from '@angular/core';
import { AddAdvertisement } from '../addAdvertisement';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdsError } from './adserror';
import { Work } from './work';

@Component({
  selector: 'app-adsedit',
  templateUrl: './adsedit.component.html',
  styleUrls: ['./adsedit.component.css']
})
export class AdseditComponent implements OnInit {

  addAdvertisement: AddAdvertisement = new AddAdvertisement();
  error : AdsError = new AdsError;

  constructor(
    private http: HttpClient,
    private router: Router) { }

    currencies :any;
    currency;
    guaranties :any;
    guaranteeLength;

    currentDate = new Date();
    minDate = this.currentDate.setHours(this.currentDate.getHours() + 24);
    maxDate = this.currentDate.setHours(this.currentDate.getHours() + 48);
    bidOn = false;
    date = this.convertDateToString(this.currentDate);
    bidRate;
    work;
    categories;
    category;

  ngOnInit() {
    this.checkError();
    this.getCurrency();
    this.getGuaranteeLength();
    this.getCategories();
  }
  asd() {
    console.log(this.currency);
  }

  convertDateToString(date: Date): string {
    let result = "";
    result += date.getFullYear() + "-" + date.getMonth() + 1 + "-" +date.getDate() + "T";
    result += date.getHours() + ":" + date.getMinutes();
    return result;
  }

  getCategories() {
    this.http.get("api/works/categories").subscribe((categories)=> {this.categories = categories;
    console.log(this.categories)});
  }

  setDate(event) {
    this.date = event.target.value;
  }

  getCurrency() {
    this.http.get('api/currency/all').subscribe(response => {
      this.currencies = response;
    });
  }

  getGuaranteeLength() {
    this.http.get('api/guarantee_length/all').subscribe(response => {
      this.guaranties = response;
    });
  }

  getUserIdFromSession() {
    return JSON.parse(sessionStorage.getItem('user')).id;
  }

  saveChanges() {
    if (this.sendCheck()) {
      alert("All fields must be filled!");
    }
    else {
      console.log(this.addAdvertisement.guarantee_value);

    let work = new Work();
    work.userId = this.getUserIdFromSession();
    work.workTitle = this.addAdvertisement.workTitle;
    work.workDescription = this.addAdvertisement.workDescription;
    work.currency = this.currency.currency;
    work.price = this.addAdvertisement.price;
    work.guarantee_length = "Year";
    work.guarantee_value = this.addAdvertisement.guarantee_value;
    work.category = this.category;

    if (this.bidOn) {
      work.bid = this.bidOn;
      work.bid_expire_date = this.convertDate(this.date);
      work.in_bidder_user_rate = this.bidRate;
      work.due_date = this.convertDate(this.date);
    }


    this.http.post('api/works/addnew', work).subscribe(console.log);
    }
  }

  convertDate(date: String): string {
    let asd = date;
    return asd.replace("T", " ") + ":00";
  }

  checkValidYear() {
    let num = Number(this.addAdvertisement.guarantee_value);
    if(!num && this.addAdvertisement.guarantee_value != "") {
      this.error.garanteeLength = "Guarantees must be set!"
      return false;
    }
    else {
      this.error.garanteeLength = "";
      return true;
    }
  }

  checkValidPrice() {
    let num = Number(this.addAdvertisement.price);
    if(!num && this.addAdvertisement.price != "") {
      this.error.price = "Price must be set!"
      return false;
    }
    else {
      this.error.price = "";
      return true;
    }
  }

  checkTitleEmpty() {
    let title = this.addAdvertisement.workTitle
    if(title === "" || title == null) {
      this.error.title = "Title must be set!"
      return false;
    }
    else {
      this.error.title = "";
      return true;
    }
  }

  checkDescriptionEmpty() {
    let description = this.addAdvertisement.workDescription;
    if(description === "" || description == null) {
      this.error.description = "Description must be set!"
      return false;
    }
    else {
      this.error.description = "";
      return true;
    }
  }

  sendCheck() {
    if (
      this.checkValidYear() &&
      this.checkValidPrice() &&
      this.checkTitleEmpty() &&
      this.checkDescriptionEmpty()
      ){
        return false;
    }
    else {
      return true;
    }
  }

  checkError() {
    this.checkValidYear();
    this.checkValidPrice();
    this.checkTitleEmpty(); 
    this.checkDescriptionEmpty();
  }
}
