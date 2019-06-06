import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../helpers/service/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  
  constructor(private userserv : UserService, private router: Router) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      'email': new FormControl(null, {
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.checkDuplicateEmail.bind(this)],
        updateOn: 'blur'
      }),
      'password': new FormControl(null, [Validators.required])
    });
  }

  register() {
    let newUser = this.registerForm;
    this.userserv.registerUser(newUser.value).subscribe(
      (data) => {
        this.router.navigate(['/user/login'])
      },
      (err) => console.log(err)
    );
  }
  
  checkDuplicateEmail(control: FormControl): Promise<any> | Observable<any> {
    const _this = this;
    const promise = new Promise<any>((resolve, reject) => {
      _this.userserv.checkDuplicateEmail(control.value).subscribe(
        (data: any[]) => {
          if (!data) {
            setTimeout(() => {
              resolve({ 'emailInvalid': true });
            }, 3000);
          } else {
            setTimeout(() => {
              resolve(null);
            }, 3000);
          }
        },
        err => {
          resolve(null)
        }
      )
    })
    return promise;
  }

}
