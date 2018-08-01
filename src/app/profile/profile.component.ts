import { Component, OnInit } from '@angular/core';
import { Observable, Subject, pipe } from 'rxjs';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: String;
  profile;
  probe = "probe1";
  //profile: String;
  //userId: String;

  //constructor() { }

  edit = false;
  selectedFile;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    //this.loadProfilePage();
    this.getProfile();
    this.getUserId();
  }

  public getUserId() {
     
    let userString = sessionStorage.getItem("user");
    let userObject = JSON.parse(userString);
    //console.log(userObject.username);
    this.username = userObject.username;
    let userId = JSON.stringify(userObject.id);
    //let name = user.name; 
    return userId;
  }

  getProfile() {
    let userId = this.getUserId();
    this.http.get("api/profiles/" + userId).subscribe(response => {
      console.log(response);
      this.profile = response;
  });
  }

  showEdit() {
    if (this.edit) {
      this.edit = false;
    }
    else {
      this.edit = true;
    }
  }

  saveChanges() {
    this.http.post("api/profile/update", this.profile).subscribe(console.log);
  }

  uploadPic() {
    let fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.http.post('api/file', fd).subscribe(console.log);
    this.profile.picture = this.selectedFile.name;
    this.saveChanges();
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

}
