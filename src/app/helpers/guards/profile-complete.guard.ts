import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})

export class ProfileCompleteGuard implements CanActivate {

  constructor(private auth: AuthService, public router: Router, private activatedRoute: ActivatedRoute) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isProfileComplete()) {
      this.router.navigate(['/home/profile']);
      return false;
    } else {
      return true;
      
    }
  }
}
