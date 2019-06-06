import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-your-requests',
  templateUrl: './your-requests.component.html',
  styleUrls: ['./your-requests.component.css']
})
export class YourRequestsComponent implements OnInit {

  profileData: Object;

  constructor(private route: ActivatedRoute) { 
    this.route.snapshot.data['requestData'].subscribe(
      (data) => {
        Object.keys(data).map(function (key, index) {
          data[index].type = 'request_by';
        });
        this.profileData = data;
      }
    )
  }

  ngOnInit() {
   
  }

}
