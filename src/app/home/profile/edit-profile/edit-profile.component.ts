import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ProfileService } from '../../../helpers/service/profile.service';
import { UserService } from '../../../helpers/service/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  profileDetails;
  profileForm: FormGroup;
  showDefaultAlert: boolean = true;
  states = ["Andhra Pradesh", "Andaman and Nicobar", "Arunachal Pradesh","Assam","Bihar","Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli","Daman and Diu", "Delhi", "Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala", "Lakshadweep", "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha", "Puducherry", "Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"];

  constructor(private profileServ: ProfileService, private userservice: UserService, private http: HttpClient) { }

  ngOnInit() {
    this.profileDetails = this.profileServ.getProfileData();
    this.profileForm = new FormGroup({
      'fname': new FormControl(this.profileDetails.fname, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(24), Validators.pattern('^[a-zA-Z]+$')]
      }),
      'lname': new FormControl(this.profileDetails.lname, {
        validators: [Validators.required, Validators.minLength(1), Validators.maxLength(24), Validators.pattern('^[a-zA-Z]+$')]
      }),
      'email': new FormControl(this.profileDetails.email, [Validators.required]),
      'phone': new FormControl(this.profileDetails.phone, { 
        validators: [Validators.required, Validators.maxLength(10), Validators.pattern(/^[0-9]*$/)]
      }),
      'gender': new FormControl(this.profileDetails.gender, [Validators.required]),
      'dob': new FormControl(this.profileDetails.dob, {
        validators: [Validators.required],
        asyncValidators: [this.profileServ.checkDateofBirth.bind(this)],
        updateOn: 'blur'
      }),
      'country': new FormControl('India', [Validators.required]),
      'state': new FormControl(this.profileDetails.state, [Validators.required]),
      'picture': new FormControl(this.profileDetails.picture === '' ? null : this.profileDetails.picture, {
        asyncValidators: [this.profileServ.checkValidImage.bind(this)],
        updateOn: 'blur'
      }),
    });
  }

  updateProfile() {
    this.userservice.updateProfile(this.profileForm.value, this.profileDetails.profile_id).subscribe(
      (data) => {
        this.profileServ.setProfileData(data);
        this.profileServ.updateProfileData(data);
        this.showDefaultAlert = false;
      }
    );
  }












}
