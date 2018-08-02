import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  username: String;
  profile;
  edit = false;
  selectedFile;

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
    let that = this;
    this.http.post("api/profile/update", {
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      userId: this.getUserId(),
      phone: this.profile.phone,
      address: this.profile.address,
      description: this.profile.description,
      picture: this.profile.picture
    }).subscribe(resp =>{
          console.log(resp);
          that.getProfile();
        }
      );
  }

  uploadPic() {
    let that = this;
    let fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.http.post('api/file', fd).subscribe(resp => {
      console.log(resp);
      that.profile.picture = that.selectedFile.name;
    } );
    //this.saveChanges();
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
}
