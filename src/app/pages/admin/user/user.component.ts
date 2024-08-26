import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UserComponent {
  users: User[] = [];
  selectedUser: User | null = null;
  newUser: User = { id: 0, name: '', email: '', role: '', avatar: '', password: '' };
  isLoading: boolean = true;

  constructor(private userService: UserService, private toastr: ToastrService) {}

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
        console.log('Pengguna berhasil ditambahkan', newUser);
        this.resetForm();
        this.getUsers();
        this.toastr.success('Pengguna Berhasil ditambahkan');
      },
      (error) => {
        this.toastr.error('Gagal menambahkan pengguna', error);
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
