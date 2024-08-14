import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loginUrl = 'users'; 
  private currentUser: User | null = null;

  constructor(private apiService: ApiService) { }

  login(email: string, password: string, role: string): Observable<boolean> {
    return this.apiService.get<User[]>(this.loginUrl).pipe(
      map(users => users.find(user => user.password === password && user.email === email && user.role === role) !== undefined),
      map(success => {
        if (success) {
          this.currentUser = { email, password, role }; 
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
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getRole(): string | null {
    return this.currentUser ? this.currentUser.role : null;
  }
}
