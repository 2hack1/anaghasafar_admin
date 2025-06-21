import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {



   constructor(private router: Router) {}

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // true if token exists, false if null
  }

  checkAuthAndRedirect(): void {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']); // 🔁 redirect to login if not logged in
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
