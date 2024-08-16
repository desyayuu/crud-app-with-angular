import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Tambahkan ini untuk ngFor dan ngIf
import { UserService } from '../../core/user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule] 
})
export class AdminDashboardComponent {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Gagal mengambil data user', error);
      }
    );
  }
}
