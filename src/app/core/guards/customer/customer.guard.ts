import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router, private toast: ToastrService) {}

  canActivate(): boolean {
    const role = this.authService.getRole();
    console.log(role); 
    if (role === 'customer') {
      return true;
    } else {
      this.router.navigate(['login']);
      this.toast.error("Harap Login terlebih dahulu")
      return false;
    }
  }
}

