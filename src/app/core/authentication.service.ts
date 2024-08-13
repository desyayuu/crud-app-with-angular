import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loginUrl = 'users'; 
  private currentUser: any = null;

  constructor(private apiService: ApiService) { }

  login(email: string, password: string, role: string): Observable<boolean> {
    return this.apiService.get<any[]>(this.loginUrl).pipe(
      map(users => users.find((user: { email: string;  password: string; role: string}) => user.password === password && user.email === email 
       && user.role === role) !== undefined),
      map(success => {
        if (success) {
          this.currentUser = { role }; 
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => of(false))
    );
  }

  logout(): void {
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getRole(): string {
    return this.currentUser ? this.currentUser.role : null;
  }
}
