import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(formObj) {
    return this.http.post('http://localhost:5000/users', formObj);
  }

  checkDuplicateEmail(email) {
    return this.http.get('http://localhost:5000/users/' + email);
  }

  validateUser(formObj) {
    return this.http.post('http://localhost:5000/users/login', formObj);
  }

  validateImage(url) {
    console.log(url)
    return this.http.get(url , {observe: 'response'});
  }

  completeProfile(formObj) {
    return this.http.post('http://localhost:5000/home/profile', formObj);
  }

  getProfileDetails(id) {
    return this.http.get('http://localhost:5000/home/profile/' + id);
  }

  updateProfile(formObj, id) {
    return this.http.post('http://localhost:5000/home/profile/' + id, formObj);
  }  
  
  loadImag(url) {
    return this.http.get(url, { responseType: 'blob' });
  }

}
