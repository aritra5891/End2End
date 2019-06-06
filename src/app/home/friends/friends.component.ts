import { Component, OnInit } from '@angular/core';
import { FriendService } from '../../helpers/service/friend.service';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friendRequests: Number = 0;

  constructor(private friendservice: FriendService) {}

  ngOnInit() {
    this.friendRequests = this.friendservice.getFriendDetailsMap()['request_by'].length;
    this.friendservice.getFriendData().subscribe(
      (data) => {
        this.friendRequests = data.request_by.length;
      }
    )        
  }

}
