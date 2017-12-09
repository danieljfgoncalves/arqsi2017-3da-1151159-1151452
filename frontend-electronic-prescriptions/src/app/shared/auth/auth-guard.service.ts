import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let b1 = this.authService.isAuthenticated();
    let b2 = this.authService.isAnonymous();

    // If authenticated or anonymous continue to app
    if (this.authService.isAuthenticated() || this.authService.isAnonymous()) return true;
    // Else try logging in
    this.router.navigate(['/content-layout/login'], { replaceUrl: true });
    return false;
  }
}
