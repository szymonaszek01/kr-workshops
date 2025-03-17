import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    const token: string | null = localStorage.getItem('userToken');
    const user: string | null = localStorage.getItem('user');

    if (!token || !user) {
      this.router.navigateByUrl('');
      return false;
    }
    return true;
  }
}
