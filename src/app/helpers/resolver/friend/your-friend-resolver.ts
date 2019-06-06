import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../../service/auth.service';
import { FriendService } from './../../service/friend.service';


@Injectable({
  providedIn: 'root'
})
export class YourFriendResolver implements Resolve<any> {

  constructor(private http: HttpClient, private auth: AuthService, private friendService: FriendService) { }

  resolve(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean {
    let id = atob(this.auth.getUserData('USER_ID'));
    return this.friendService.getFriendDetails(id).pipe(map(data => {
      this.friendService.fetchFriendData(data[0]);
      let friendsId = data[0].friends_id;
      let friendsArrayCall = this.friendService.findFriends(friendsId);
      return friendsArrayCall;
    }));
  }

}
