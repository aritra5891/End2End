import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _profileData = new Subject<any>();
  private _completeProfileData = new Subject<any>();
  private profileData;

  constructor(private http: HttpClient, private userservice: UserService, private auth: AuthService) { }

  setProfileData(obj) {
    this.profileData = obj;
  }

  getProfileData() {
    return this.profileData;
  }

  updateProfileData(obj) {
    this._profileData.next(obj);
  }

  fetchProfileData() {
    return this._profileData.asObservable();
  }

  completeProfile(profileObj) {
    this.auth.changeProfileStatus();
    this.setProfileData(profileObj);
    this._completeProfileData.next(profileObj);
  }

  completeProfileFlag() {
    return this._completeProfileData.asObservable();
  }

  checkDateofBirth(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      let date1 = new Date(control.value);
      let date2 = new Date();
      let diffTime = date2.getTime() - date1.getTime();
      let diffDays = diffTime / (1000 * 60 * 60 * 24);
      let years = (diffDays / 365);
      if (years < 18) {
        resolve({ 'futureDate': true });
      } else if (years > 100) {
        resolve({ 'pastDate': true });
      } else {
        resolve(null)
      }
    })
    return promise;
  }

  checkValidImage(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      if (!control.value) {
        resolve(null);
      } else {
        return this.http.get(control.value , {observe: 'response'}).subscribe(
          data => { },
          (resp) => {
            let type = resp.headers.get('content-type');
            if (type) {
              if (type.indexOf('image') > -1) {
                resolve(null)
              } else {
                resolve({ 'invalidImg': true })
              }
            } else {
              resolve({ 'invalidImg': true })
            }
          }
        )
      }
    })
    return promise;
  }



}
