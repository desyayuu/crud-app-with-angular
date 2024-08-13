import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { AuthenticationService } from '../../core/authentication.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  message: string | null = null;

  constructor(private authService: AuthenticationService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.email, this.password, this.role).subscribe(success => {
      if (success) {
        if(this.role === 'admin'){
          this.router.navigate(['/admin-dashboard']); 
        }else if(this.role == 'customer'){
          this.router.navigate(['/customer-dashboard']); 
        }
      } else {
        this.message = 'Invalid email, username, or role';
      }
    });
  }
}
