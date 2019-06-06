import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HomeGuard implements CanActivate {
  
  constructor(private auth: AuthService, public router: Router) {}
  
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.auth.isUserLoggedIn()) {
      this.router.navigate(['/user/register']);
      return false;
    }
    return true
  }
}
