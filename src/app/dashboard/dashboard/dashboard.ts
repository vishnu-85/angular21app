import { Component } from '@angular/core';
import { selectUser } from '../../auth/store/auth.selectors';
import * as AuthActions from '../../auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

  user$:any;
  user:any={name:'', email:''};
  constructor(private store: Store,
    private storageService: StorageService
  ) {
    this.user$ = this.store.select(selectUser);
    this.user$.subscribe((data:any) => {
      this.user = data;
    });
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

}
