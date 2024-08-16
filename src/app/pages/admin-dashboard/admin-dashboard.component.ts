import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Tambahkan ini
import { UserService } from '../../core/user.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] // Pastikan FormsModule diimpor di sini
})
export class AdminDashboardComponent {
  users: User[] = [];
  selectedUser: User | null = null;

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

  selectUser(user: User): void {
    this.selectedUser = user;
  }

  saveChanges(): void {
    if (this.selectedUser) {
      this.userService.updateUser(this.selectedUser).subscribe(
        (response) => {
          console.log('Pengguna berhasil diperbarui', response);
          this.getUsers();
        },
        (error) => {
          console.error('Gagal memperbarui pengguna', error);
        }
      );
    }
  }
}
