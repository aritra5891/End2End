import { ProfileCompleteGuard } from './../helpers/guards/profile-complete.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { ProfileComponent } from './profile/profile.component';
import { CreateProfileComponent } from './profile/create-profile/create-profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';

import { FriendsComponent } from './friends/friends.component';
import { YourFriendsComponent } from './friends/your-friends/your-friends.component';
import { YourRequestsComponent } from './friends/your-requests/your-requests.component';
import { AllPeopleComponent } from './friends/all-people/all-people.component';

import { FriendRequestResolver } from './../helpers/resolver/friend/friend-request-resolver';
import { FindFriendsResolver } from './../helpers/resolver/friend/find-friends-resolver';
import { YourFriendResolver } from './../helpers/resolver/friend/your-friend-resolver';


const routes: Routes = [
    {
        path: "", component: HomeComponent, children: [
            {
                path: "profile", component: ProfileComponent, children: [
                    { path: "", component: EditProfileComponent },
                    { path: "create", component: CreateProfileComponent, canActivate: [ProfileCompleteGuard] }
                ]
            },
            {
                path: "friend", component: FriendsComponent, children: [
                    {
                        path: "", component: YourFriendsComponent, resolve: {
                            friendData: YourFriendResolver
                        }
                    },
                    {
                        path: "requests", component: YourRequestsComponent, resolve: {
                            requestData: FriendRequestResolver
                        }
                    },
                    {
                        path: "find", component: AllPeopleComponent, resolve: {
                            otherPeopleData: FindFriendsResolver
                        }
                    },
                ]
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule { }
