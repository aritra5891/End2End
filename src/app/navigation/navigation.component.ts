import { Component, OnInit } from '@angular/core';
import { AuthService } from '../helpers/service/auth.service';
import { FriendService } from '../helpers/service/friend.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  showProfileOptions: boolean;
  collapsed = true;
  friendRequests: Number = 0;
    
  constructor(private auth: AuthService, private friendservice: FriendService) { }

  ngOnInit() {
    this.showProfileOptions = this.auth.isUserLoggedIn();
    this.auth.getLoggedIn().subscribe(
      (flag) => {
        this.showProfileOptions = flag;
      }
    )
    this.friendservice.getFriendData().subscribe(
      (data) => {
        this.friendRequests = data.request_by.length;
      }
    )
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  logout() {
    this.auth.logout();
  }

}
