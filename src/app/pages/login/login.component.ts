import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  role: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router, private toast: ToastrService) { }

  onSubmit(loginForm: NgForm): void {
    if(loginForm.invalid){
      this.toast.error('Harap isi login form dengan benar');
    }

    this.isLoading = true;
    this.authService.login(this.email, this.password).subscribe(success => {
      this.isLoading = false;
      if (success) {
        const userRole = this.authService.getRole();
        if (userRole === this.role) {
          if (this.role === 'admin') {
            this.router.navigate(['/admin/']);
          } else if (this.role === 'customer') {
            this.router.navigate(['/customer/']); 
          } else {
            this.toast.error('Invalid role selected.');
          }
        } else {
          this.toast.error('Role does not match with user credentials.');
        }
      } else {
        this.toast.error('Invalid email or password');
      }
    }, error => {
      this.isLoading = false;
      console.error('Login error:', error);
      this.toast.error('An error occurred during login. Please try again later.');
    });
  }
}
