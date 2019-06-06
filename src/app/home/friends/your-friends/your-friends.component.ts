import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-your-friends',
  templateUrl: './your-friends.component.html',
  styleUrls: ['./your-friends.component.css']
})
export class YourFriendsComponent implements OnInit {

  profileData: Object;
  
  constructor(private route: ActivatedRoute) {
    this.route.snapshot.data['friendData'].subscribe(
      (data) => {
        Object.keys(data).map(function (key, index) {
          data[index].type = 'friend';
        });
        this.profileData = data;
      }
    )
  }

  ngOnInit() {
  }

}
