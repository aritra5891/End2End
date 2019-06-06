import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { RegisterComponent } from './register/register.component';
import { HomeGuard } from './helpers/guards/home.guard';
import { ProfileGuard } from './helpers/guards/profile.guard';
import { HomeResolver } from './helpers/resolver/home-resolver';

const routes: Routes = [
  { path: "",  redirectTo: '/home', pathMatch: 'full' },
  { path: "user/register", component: RegisterComponent },
  { path: "user/login", loadChildren: "../app/login/login.module#LoginModule" },
  { 
    path: "home", 
    loadChildren: "../app/home/home.module#HomeModule", 
    canActivate: [HomeGuard, ProfileGuard], 
    canActivateChild: [ProfileGuard],
    resolve: {
      profileData : HomeResolver
    }
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})

export class AppRoutingModule { }
