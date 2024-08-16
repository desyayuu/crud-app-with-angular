import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service'; 
import { User } from './models/user.model'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private endpoint = 'users'; 

  constructor(private apiService: ApiService) { }

  getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>(this.endpoint); 
  }

  updateUser(user: User): Observable<User> { 
    const url = `${this.endpoint}/${user.id}`; 
    return this.apiService.put<User>(url, user);
  }

  deleteUser(id: number): Observable<User>{
    const url = `${this.endpoint}/${id}`; 
    return this.apiService.delete<User>(this.endpoint);
  }
}
