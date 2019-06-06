import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../../service/auth.service';
import { FriendService } from './../../service/friend.service';


@Injectable({
  providedIn: 'root'
})
export class FindFriendsResolver implements Resolve<any> {

  constructor(private http: HttpClient, private auth: AuthService, private friendService: FriendService) { }

  resolve(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean {
    let id = atob(this.auth.getUserData('USER_ID'));
    return this.friendService.getFriendDetails(id).pipe(map(data => {
      this.friendService.fetchFriendData(data[0]);
      let requesToId = data[0].request_to;
      let otherFriendId = data[0].friends_id.concat(data[0].request_by).concat(requesToId);
      otherFriendId.push(id);
      let otherFriend = this.friendService.findOtherFriends(otherFriendId);
      let requestFriend = this.friendService.findFriends(requesToId);
      return forkJoin([otherFriend, requestFriend]);
    }));
  }


}
