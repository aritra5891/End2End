import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-people',
  templateUrl: './all-people.component.html',
  styleUrls: ['./all-people.component.css']
})
export class AllPeopleComponent implements OnInit {

  p: number = 1;
  profileData: Object;
  profileType = ['others', 'request_to'];

  constructor(private route: ActivatedRoute) {
    this.route.snapshot.data['otherPeopleData'].subscribe(
      (data) => {
        const _self = this;
        Object.keys(data).map(function (i) {
          if (Object.keys(data[i]).length != 0) {
            Object.keys(data[i]).map(function (key, index) {
              data[i][index].type = _self.profileType[i];
            });
          }
        });
        this.profileData = data[0].concat(data[1]);
      }
    )
  }

  ngOnInit() {

  }




}
