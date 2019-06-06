import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home.component';
import { FriendsComponent } from './friends/friends.component';
import { CreateProfileComponent } from './profile/create-profile/create-profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { YourFriendsComponent } from './friends/your-friends/your-friends.component';
import { YourRequestsComponent } from './friends/your-requests/your-requests.component';
import { AllPeopleComponent } from './friends/all-people/all-people.component';
import { FriendsPlaceholderComponent } from './friends/friends-placeholder/friends-placeholder.component';
import { AgePipe } from '../helpers/pipes/age.pipe';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  declarations: [ProfileComponent, HomeComponent, FriendsComponent, CreateProfileComponent, EditProfileComponent, ProfileInfoComponent, YourFriendsComponent, YourRequestsComponent, AllPeopleComponent, FriendsPlaceholderComponent, AgePipe]
})
export class HomeModule { }
