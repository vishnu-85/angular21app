import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
      path: 'login',
      loadComponent: () =>
        import('./auth/login/login')
          .then(m => m.LoginComponent)
    },
    {
      path: 'dashboard',
      canActivate: [authGuard],
      loadComponent: () =>
        import('./dashboard/dashboard/dashboard')
          .then(m => m.Dashboard)
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
  ];
  