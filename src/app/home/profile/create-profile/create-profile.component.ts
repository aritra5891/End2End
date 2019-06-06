import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from './../../../helpers/service/user.service';
import { AuthService } from '../../../helpers/service/auth.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../../../helpers/service/profile.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {


  profileForm: FormGroup;
  userId: string;
  userEmail: string;
  states = ["Andhra Pradesh", "Andaman and Nicobar", "Arunachal Pradesh","Assam","Bihar","Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli","Daman and Diu", "Delhi", "Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala", "Lakshadweep", "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha", "Puducherry", "Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"];
  

  constructor(private userservice : UserService, 
              private auth: AuthService, 
              private router: Router, 
              private profileService: ProfileService, 
              private http: HttpClient) { }

  ngOnInit() {
    this.getUserInputs();
    this.profileForm = new FormGroup({
      'fname': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(24), Validators.pattern('^[a-zA-Z]+$')]),
      'lname': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(24), Validators.pattern('^[a-zA-Z]+$')]),
      'email': new FormControl(this.userEmail, [Validators.required]),
      'phone': new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.pattern(/^[0-9]*$/)]),
      'gender': new FormControl(null, [Validators.required]),
      'dob': new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [this.profileService.checkDateofBirth.bind(this)],
        updateOn: 'blur'
      }),
      'country': new FormControl('India', [Validators.required]),
      'state': new FormControl(null, [Validators.required]),
      'picture': new FormControl(null, {
        asyncValidators: [this.profileService.checkValidImage.bind(this)],
        updateOn: 'blur'
      }),
    });
  }

  getUserInputs() {
    let data = JSON.parse(localStorage.getItem("USER_DATA"));
    this.userEmail = atob(data["USER_EMAIL"]);
    this.userId = atob(data["USER_ID"]);
  }

  completeProfile() {
    this.profileForm.value.profile_id = this.userId;
    this.userservice.completeProfile(this.profileForm.value).subscribe(
      (data) => {
        this.profileService.completeProfile(data);
      }
    )
  }

}
