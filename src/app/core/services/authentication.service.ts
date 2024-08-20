import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loginUrl = 'users'; 
  private currentUser: Auth | null = null;

  constructor(private apiService: ApiService, private router: Router) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  login(email: string, password: string, role: string): Observable<boolean> {
    return this.apiService.get<Auth[]>(this.loginUrl).pipe(
      map(users => users.find(user => user.password === password && user.email === email && user.role === role) !== undefined),
      map(success => {
        if (success) {
          this.currentUser = { email, password, role };
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser)); 
          return true;
        } else {
          return false;
        }
      }),
      catchError(error => {
        console.error('Login error', error);
        return of(false);
      })
    );
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getRole(): string | null {
    return this.currentUser ? this.currentUser.role : null;
  }
}
