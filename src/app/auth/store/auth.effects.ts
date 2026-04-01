import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, delay } from 'rxjs';
import * as AuthActions from './auth.actions';

export class AuthEffects {

  actions$ = inject(Actions);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      delay(1000),
      map(() => AuthActions.loginSuccess({ token: 'fake-jwt-token' }))
    )
  );
}
