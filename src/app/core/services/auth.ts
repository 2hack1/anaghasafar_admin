import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {



  constructor(private router: Router) { }

  isLoggedIn(): boolean {
    const token =  sessionStorage.getItem('token');
    return !!token; // true if token exists, false if null
  }

  checkAuthAndRedirect(): void {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']); // 🔁 redirect to login if not logged in
    }
  }

  logout(): void {
     sessionStorage.removeItem('token');
     sessionStorage.clear()
    this.router.navigate(['/login']);
  }
}
