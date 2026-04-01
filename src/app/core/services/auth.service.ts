import { Injectable } from '@angular/core';
import { of, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  login(email: string, password: string) {
    if (email === 'vishnu@test.com' && password === '1234') {
      return of({ token: 'fake-jwt-token' }).pipe(delay(1000));
    }

    throw new Error('Invalid Credentials');
  }
}
