import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  set(key: string, value: any) {
    if (this.isBrowser) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  get(key: string) {
    if (this.isBrowser) {
      return JSON.parse(localStorage.getItem(key) || 'null');
    }
    return null;
  }

  clear() {
    if (this.isBrowser) {
      localStorage.clear();
    }
  }
}
