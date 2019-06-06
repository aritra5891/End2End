import { forkJoin } from 'rxjs';
import { FriendService } from './../service/friend.service';
import { AuthService } from './../service/auth.service';
import { UserService } from './../service/user.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute, Resolve } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HomeResolver implements Resolve<any> {

  constructor(private http: HttpClient, private auth: AuthService, private userserv: UserService, private friendService: FriendService) { }

  resolve(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean {
      let id = atob(this.auth.getUserData('USER_ID'));

      let profileData = this.userserv.getProfileDetails(id);
      let friendMap = this.friendService.getFriendDetails(id);
      return forkJoin([profileData, friendMap]);
      //return this.userserv.getProfileDetails(id);
  }

}
