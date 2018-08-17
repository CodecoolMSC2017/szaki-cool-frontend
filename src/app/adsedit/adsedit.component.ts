import { Component, OnInit } from '@angular/core';
import { AddAdvertisement } from '../addAdvertisement';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-adsedit',
  templateUrl: './adsedit.component.html',
  styleUrls: ['./adsedit.component.css']
})
export class AdseditComponent implements OnInit {

  addAdvertisement: AddAdvertisement = new AddAdvertisement();

  constructor(
    private http: HttpClient,
    private router: Router) { }

  ngOnInit() {
  }

  getUserIdFromSession() {
    return JSON.parse(sessionStorage.getItem('user')).id;
  }

  saveChanges() {
    console.log(this.addAdvertisement.guarantee_value);
    this.http.post('api/works/addnew', {
      userId: this.getUserIdFromSession(),
      workTitle: this.addAdvertisement.workTitle,
      workDescription: this.addAdvertisement.workDescription,
      currency: 'USD',
      price: this.addAdvertisement.price,
      guarantee_length: 'Year',
      guarantee_value: '0',
      category: 'default'
    }).subscribe(console.log);
  }



}
