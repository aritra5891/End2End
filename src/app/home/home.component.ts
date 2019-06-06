import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../helpers/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../helpers/service/profile.service';
import { FriendService } from './../helpers/service/friend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profileComplete:boolean = false;
  userEmail: string;
  profileDetails;

  constructor(private auth: AuthService, 
              private route: ActivatedRoute, 
              private profileServ: ProfileService,
              private friendServ: FriendService, 
              private router: Router) {

      if(this.auth.isProfileComplete()) {
        this.friendServ.fetchFriendData(this.route.snapshot.data['profileData'][1][0]);
        this.profileComplete = true;
        this.profileDetails = this.route.snapshot.data['profileData'][0][0];
        this.profileServ.setProfileData(this.profileDetails);
      }
   
  }

  ngOnInit() {
    this.auth.getProfileComplete().subscribe(
      (flag) => {
          this.profileServ.completeProfileFlag().subscribe(
            (data) => {
              this.profileDetails = data;
              this.profileComplete = true;
              this.router.navigate(['/home']);
            }
          )
 
      }
    )
    this.userEmail = atob(this.auth.getUserData('USER_EMAIL'));
  }

  
}
