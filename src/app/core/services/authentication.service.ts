import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loginUrl = 'auth/login'; 
  private currentUser: { email: string, role: string } | null = null;

  constructor(private apiService: ApiService, private router: Router) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  login(email: string, password: string): Observable<boolean> {
    const dataLogin = { email, password };
    return this.apiService.post<{ access_token: string }>(this.loginUrl, dataLogin).pipe(
      tap(response => {
        if (response.access_token) {
          localStorage.setItem('token', response.access_token); 
          this.getProfile().subscribe(profile => {
            if (profile) {
              this.currentUser = { email: profile.email, role: profile.role };
              localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            }
          });
        }
      }),
      map(response => !!response.access_token),
      catchError(error => {
        console.error('Login error', error);
        return of(false);
      })
    );
  }
  

  getProfile(): Observable<User | null> {
    return this.apiService.get<User>('auth/profile').pipe(
      catchError(error => {
        console.error('Error fetching profile', error);
        return of(null);
      })
    );
  }
  
  refreshToken(): Observable<boolean> {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      return of(false);
    }
  
    return this.apiService.post<{ access_token: string, refresh_token: string }>('auth/refresh-token', { refreshToken }).pipe(
      map(response => {
        if (response.access_token) {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
          return true;
        } else {
          return false;
        }
      }),
      catchError(error => {
        console.error('Error refreshing token', error);
        return of(false);
      })
    );
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getRole(): string | null {
    return this.currentUser ? this.currentUser.role : null;
  }
}
