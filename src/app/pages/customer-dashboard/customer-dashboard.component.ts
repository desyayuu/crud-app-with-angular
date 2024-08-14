import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent {
  constructor(private authService: AuthenticationService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }
}
