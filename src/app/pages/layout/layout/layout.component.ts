import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { SidebarCustomerComponent } from '../sidebar-customer/sidebar-customer.component';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterOutlet, SidebarComponent, FooterComponent, SidebarCustomerComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isLoginPage: boolean = true;
  isAdminPage: boolean = false; 
  isCustomerPage: boolean = false;

  constructor(private router: Router, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.router.url === '/login';
        this.isAdminPage = this.router.url.startsWith('/admin') && this.authService.isLoggedIn() && this.authService.getRole() === 'admin';
        this.isCustomerPage = this.router.url.startsWith('/customer') && this.authService.isLoggedIn() && this.authService.getRole() === 'customer';

        console.log('Current URL:', this.router.url); 
        console.log('Is login page:', this.isLoginPage);
        console.log('Is admin page:', this.isAdminPage); 
        console.log('Is customer page:', this.isCustomerPage);
      }
    });
    
    this.isLoginPage = this.router.url === '/login';
    this.isAdminPage = this.router.url.startsWith('/admin') && this.authService.isLoggedIn() && this.authService.getRole() === 'admin';
    this.isCustomerPage = this.router.url.startsWith('/customer') && this.authService.isLoggedIn() && this.authService.getRole() === 'customer';
  }
}
