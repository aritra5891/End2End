import { UserService } from './../../../helpers/service/user.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-friends-placeholder',
  templateUrl: './friends-placeholder.component.html',
  styleUrls: ['./friends-placeholder.component.css']
})
export class FriendsPlaceholderComponent implements OnInit {

  @Input () profile; 
  profilepic: string;

  constructor(private userserv: UserService) { }

  ngOnInit() {
    this.setProfilePicture();
  }

  setProfilePicture() {
    if (this.profile.picture !== null && this.profile.picture !== '') {
      this.loadImage(this.profile.picture);
    } else {
      if (this.profile.gender === 'Male') {
        this.profilepic = "assets/images/placeholder-male.jpg";
      } else {
        this.profilepic = "assets/images/placeholder-female.jpg";
      }
    }
  }

  loadImage(url) {
    this.userserv.loadImag(url).subscribe(
      (data) => this.profilepic = url
    )
  }

}
