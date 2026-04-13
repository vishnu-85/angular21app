import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select('auth').pipe(
    map((state: any) => {
      if (state.user) return true;
      router.navigate(['/login']);
      return false;
    })
  );
};
