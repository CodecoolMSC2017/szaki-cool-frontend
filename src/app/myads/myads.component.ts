import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-myads',
    templateUrl: './myads.component.html',
    styleUrls: ['./myads.component.css']
    })
export class MyadsComponent implements OnInit {

    works;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    ngOnInit() {
        this.getMyAds();
    }


    public getUserId() {
        let userString = sessionStorage.getItem("user");
        let userObject = JSON.parse(userString);
        let userId = JSON.stringify(userObject.id);
        return userId;
    }

    getMyAds() {
        let userId = this.getUserId();
        console.log(userId);
        this.http.get("api/works/favourite/"+ userId).subscribe((works)=> {this.works = works;
        console.log(this.works)});
    }
}