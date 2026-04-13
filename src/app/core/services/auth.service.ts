import { Injectable } from '@angular/core';
import { of, delay, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  login(email: string, password: string) {    
    if (email === 'shri1234@gmail.com' && password === 'Shri17dec$') {
      return of({ name: 'Vishnu Kant', email }).pipe(delay(1000));
    } else {
      return throwError(() => 'Invalid credentials');
    }
  }
}