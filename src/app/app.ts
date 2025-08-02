import { Component, OnInit } from '@angular/core';
import {  Router, RouterOutlet,NavigationEnd, Event as RouterEvent, NavigationStart, ActivatedRoute } from '@angular/router';
import { Header } from './shared/components/header/header';
import { UserServices } from './core/services/user-services';
import { CommonModule } from '@angular/common';
import { HotelVendorHeader } from './shared/components/hotel component/hotel-vendor-header/hotel-vendor-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header,CommonModule,HotelVendorHeader],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

 
  protected title = 'adminfrontend';
  status: 'active' | 'deactive' = 'deactive';
    isLoginPage = false;
isHotelVendor = false;
     constructor(private user: UserServices,private router: Router,private acticva:ActivatedRoute) {
      this.user.state$.subscribe(state => {
      this.status = state as 'active' | 'deactive';
    });
    
this.router.events.subscribe(event => {
  if (event instanceof NavigationEnd) {
    const url = event.urlAfterRedirects;

    // Pages where no header is shown
    const loginLikePages = ['/login', '/hotelVendorForm', '/notfounderror404'];
    this.isLoginPage = loginLikePages.includes(url);

    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');

    const isDeskboard = url.startsWith('/deskboard');
    const isAdminPage = !isDeskboard && !loginLikePages.includes(url);

    // 🔒 Handle hotel_vendor role
    if (token && role === 'hotel_vendor') {
      if (isDeskboard) {
        this.isHotelVendor = true;
      } else {
        this.router.navigate(['/notfounderror404']);
        return;
      }
    }

    // 🔒 Handle admin role
    else if (token && role === 'admin') {
      if (isDeskboard) {
        this.router.navigate(['/notfounderror404']);
        return;
      } else {
        this.isHotelVendor = false;
      }
    }

    // ❌ No role/token or invalid
    else if (!loginLikePages.includes(url)) {
      this.router.navigate(['/notfounderror404']);
      return;
    }
  }
});





  }
}
