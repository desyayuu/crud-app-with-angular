import { Component } from '@angular/core';
import { AuthenticationService } from '../../../core/authentication.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-customer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar-customer.component.html',
  styleUrl: './sidebar-customer.component.css'
})
export class SidebarCustomerComponent {
  constructor (private authService: AuthenticationService, private router: Router){}
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }

}
