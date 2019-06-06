import { AuthService } from './../helpers/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subscription, Observable } from 'rxjs';
import { UserService } from '../helpers/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private userserv : UserService, private auth: AuthService) { }

  ngOnInit() {
     this.loginForm = new FormGroup({
      'email': new FormControl(null, {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.checkValidEmail.bind(this)],
        updateOn: 'blur'
      }),
      'password': new FormControl(null, [Validators.required])
    });
  }

  login() {
    this.userserv.validateUser( this.loginForm.value).subscribe(
      (data) => {
         this.auth.loginUser(data[0]);
      },
      (err) => {
        if(err.status === 401) {
          this.loginForm.controls['password'].setErrors({'incorrect': true});
        }
      }
    );
  }

  checkValidEmail(control: FormControl): Promise<any> | Observable<any> {
    const _this = this;
    const promise = new Promise<any>((resolve, reject) => {
      _this.userserv.checkDuplicateEmail(control.value).subscribe(
        (data: any) => {
          if (!data) {
            setTimeout(() => {
              resolve(null);
            }, 1000);
          } else {
            setTimeout(() => {
              resolve({ 'emailInvalid': true });
            }, 1000);
          }
        },
        err => {
          setTimeout(() => {
            resolve(null);
          }, 1000);
        }
      )
    })
    return promise;
  }

}
