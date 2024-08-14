import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  constructor(private authService: AuthenticationService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }
}
