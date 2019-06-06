import { ProfileService } from './profile.service';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  userToken : String = 'End2EndAuthorizationForUser';
  private _isLoggedIn = new Subject<boolean>(); 
  private _profileComplete = new Subject<boolean>(); 

  //Login and Logout Handlers

  isLoggedIn(flag? : boolean) {
    this._isLoggedIn.next(flag);
  }

  getLoggedIn(): Observable<any> {
    return this._isLoggedIn.asObservable();
  }

  loginUser(data) {
    this.prepareStorageObject(data);
    this.isLoggedIn(true);
    this.router.navigate(['/home'])
  }

  destroyToken() {
    this.isLoggedIn(false);
    localStorage.removeItem("USER_DATA");
  }

  isUserLoggedIn() {
    if(this.getUserData("USER_ID")) {
      return true
    }
    return false
  }

  logout() {
    this.router.navigate(['/user/login']);
    this.destroyToken();
  }


   // Functions for Profile Completion Status

  isProfileComplete() {
   return this.getUserData("USER_PROFILE_COMPLETE");
  }

  getProfileComplete() {
    return this._profileComplete.asObservable(); 
  }

  changeProfileStatus() {
    this._profileComplete.next(true);
    this.updateUserData('USER_PROFILE_COMPLETE', true);
  }
  // Functions to fetch the Local Storage Object

  prepareStorageObject(data) {
    let id = btoa(data._id);
    let email = btoa(data.email);
    let obj = {"USER_ID": id, "USER_PROFILE_COMPLETE" : data.profile, "USER_EMAIL" : email};
    localStorage.setItem("USER_DATA", JSON.stringify(obj));
  }

  getUserData(string) {
    let data = JSON.parse(localStorage.getItem("USER_DATA"));
    if(data) {
      return data[string];
    }
    return false;
  }

  updateUserData(key, value) {
    let data = JSON.parse(localStorage.getItem("USER_DATA"));
    data[key] = value;
    localStorage.setItem("USER_DATA", JSON.stringify(data));
  }  


}
