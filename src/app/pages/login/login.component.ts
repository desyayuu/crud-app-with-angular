import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private authService: AuthenticationService, private router: Router, private toast: ToastrService) { }

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(success => {
      if (success) {
        this.authService.getProfile().subscribe(profile => {
          if (profile) {
            if(profile.role === this.role){
              if(this.role === 'admin'){
                this.router.navigate(['/admin/'])
              }else if (this.role === 'customer') {
                this.router.navigate(['/customer/']); 
              }
            }else{
              this.router.navigate(['login']);
              this.toast.error('Invalid Role')
            }
          } else {
            this.toast.error('Fail to fetch Profile Data');
          }
        });
      } else {
        this.toast.error('Invalid email or password');
      }
    });
  }
}
