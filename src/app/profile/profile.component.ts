import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from './profile';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  username: String;
  edit = false;
  selectedFile;
  profile = new Profile;
  error;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getProfile();
  }

  public getUserId() {
    let userString = sessionStorage.getItem("user");
    let userObject = JSON.parse(userString);
    this.username = userObject.username;
    let userId = JSON.stringify(userObject.id);
    return userId;
  }

  getProfile() {
    let userId = this.getUserId();
    this.http.get<Profile>("api/profile/" + userId).subscribe(response => {
      this.profile = response;
      console.log(this.profile);
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
    this.error = null;
    let that = this;
    this.http.post("api/profile/update", this.profile).subscribe(
      success => {
        console.log(success);
      },
      error => {
        that.error = JSON.stringify(error);
      });
  }

  uploadPic() {
    let that = this;
    let fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.http.post('api/file', fd).subscribe(resp => {
      that.profile.picture = that.selectedFile.name;
    });
    
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
}
