import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AdminDashboardComponent {
  users: User[] = [];
  selectedUser: User | null = null;
  newUser: User = { id: 0, name: '', email: '', role: '', avatar: '', password: '' };
  isLoading: boolean = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
    
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.isLoading = false; 
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

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users = this.users.filter(user => user.id !== id);
      console.log(`User with ID ${id} deleted from UI`);
    }
  }

  createUser(user: User): void {
    this.userService.createUser(user).subscribe(
      (newUser: User) => {
        this.users.push(newUser);
        console.log('Bisa Masuk', newUser);
        this.resetForm();
        this.getUsers();
        console.log();
      },
      (error) => {
        console.error('Gagal menambahkan user', error);
      }
    );
  }

  onSubmit(form: NgForm): void {
    if (this.selectedUser) {
      this.saveChanges();
    } else {
      this.createUser(this.newUser);
    }
  }

  resetForm(): void {
    this.newUser = { id: 0, name: '', email: '', role: '', avatar: '', password: '' };
  }
}
