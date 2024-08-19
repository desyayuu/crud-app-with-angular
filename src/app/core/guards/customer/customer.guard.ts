import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getRole();
    console.log(role); 
    if (role === 'customer') {
      return true;
    } else {
      this.router.navigate(['access-denied']);
      return false;
    }
  }
}

