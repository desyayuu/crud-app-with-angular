import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { SidebarCustomerComponent } from '../shared/sidebar-customer/sidebar-customer.component';

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.router.url === '/login';

        // Tentukan apakah halaman admin atau customer berdasarkan URL
        this.isAdminPage = this.router.url.startsWith('/admin');
        this.isCustomerPage = this.router.url.startsWith('/customer');
        
        console.log('Current URL:', this.router.url); 
        console.log('Is login page:', this.isLoginPage); // Debug flag
        console.log('Is admin page:', this.isAdminPage); // Debug admin flag
        console.log('Is customer page:', this.isCustomerPage); // Debug customer flag
      }
    });
  }
}
