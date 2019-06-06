import { HttpClient } from '@angular/common/http';
import { UserService } from './../../helpers/service/user.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProfileService } from '../../helpers/service/profile.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  @Input() profileDetails;
  profilePicture: string;

  constructor(private userserv : UserService, private profileserv: ProfileService) {}

  ngOnInit() {
    if(!this.profileDetails) {
      console.log('profile details undefined');
    } else {
       this.setProfilePicture();
    }
    this.profileserv.fetchProfileData().subscribe(
      (data) => {
        console.log(data);
        this.profileDetails = data;
        this.setProfilePicture();
      }
    )
  }

  setProfilePicture() {
    if (this.profileDetails.picture !== null && this.profileDetails.picture !== '') {
      this.loadImage(this.profileDetails.picture);
    } else {
      if (this.profileDetails.gender === 'Male') {
        this.profilePicture = "assets/images/placeholder-male.jpg";
      } else {
        this.profilePicture = "assets/images/placeholder-female.jpg";
      }
    }
  }

  loadImage(url) {
    this.userserv.loadImag(url).subscribe(
      (data) => this.profilePicture = url
    )
  }


}
