import { Component, OnInit } from '@angular/core';
import { AddAdvertisement } from '../addAdvertisement';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { AdsError } from './adserror';
import { CheckboxRequiredValidator } from '@angular/forms';

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

  ngOnInit() {
    this.checkError();
    this.getCurrency();
  }

  getCurrency() {
    this.http.get('api/currency/all').subscribe(response => {
      this.currencies = response;
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
    this.http.post('api/works/addnew', {
      userId: this.getUserIdFromSession(),
      workTitle: this.addAdvertisement.workTitle,
      workDescription: this.addAdvertisement.workDescription,
      currency: 'USD',
      price: this.addAdvertisement.price,
      guarantee_length: 'Year',
      guarantee_value: this.addAdvertisement.guarantee_value,
      category: 'default'
    }).subscribe(console.log);
    }
  }

  checkValidYear() {
    let num = Number(this.addAdvertisement.guarantee_value);
    if(!num && this.addAdvertisement.guarantee_value != "") {
      this.error.garanteeLength = "Year must be a number!"
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
      this.error.price = "Price must be a number!"
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
