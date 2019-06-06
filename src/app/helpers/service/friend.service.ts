import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient) { }

  private friendDetailsMap : Object;
  private _friendData = new Subject<any>();

  getFriendDetails(id) {
    return this.http.get('http://localhost:5000/home/friend/' + id)
  }

  findOtherFriends(obj) {
    return this.http.post('http://localhost:5000/home/friend/others', obj)
  }

  findFriends(obj) {
    return this.http.post('http://localhost:5000/home/friend/request', obj)
  }

  setFriendDetailsMap(mapObj) {
    this.friendDetailsMap = mapObj;
  }

  getFriendDetailsMap() {
    return this.friendDetailsMap;
  }

  setFriendData(mapObj) {
    this._friendData.next(mapObj);
  }

  getFriendData() {
    return this._friendData.asObservable();
  }

  fetchFriendData(mapObj) {
    this.setFriendDetailsMap(mapObj);
    this.setFriendData(mapObj);
  }
  
}
