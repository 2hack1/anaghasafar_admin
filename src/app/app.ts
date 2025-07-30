import { Component, OnInit } from '@angular/core';
import {  Router, RouterOutlet,NavigationEnd, Event as RouterEvent, NavigationStart, ActivatedRoute } from '@angular/router';
import { Header } from './shared/components/header/header';
import { UserServices } from './core/services/user-services';
import { CommonModule } from '@angular/common';
import { HotelVendorHeader } from './shared/components/hotel-vendor-header/hotel-vendor-header';

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



// this.router.events.subscribe(event => {
//   if (event instanceof NavigationEnd) {
//     const url = event.urlAfterRedirects;

//     // 🔹 Pages where no header is shown (login, hotel form, 404)
//     const loginLikePages = ['/login', '/hotelVendorForm', '/notfounderror404'];
//     this.isLoginPage = loginLikePages.includes(url);
//     this.isHotelVendor = loginLikePages.includes(url);

//     // 🔹 Check if current route starts with /deskboard
//     const isHotelVendorRoute = url.startsWith('/deskboard');
//     // 🔹 Check if current route starts with any admin prefix
//     const adminPrefixes = [
//       '/PlanenewTrip', '/HomeCards', '/checkit', '/destination',
//       '/desk', '/orderAbout', '/sub-des', '/topimage',
//       '/userOrder', '/userTourOrder', '/packages', '/aboutTripOfPackage'
//     ];
//     const isAdminRoute = adminPrefixes.some(prefix => url.startsWith(prefix));

//     const token = sessionStorage.getItem('token');
//     const name = sessionStorage.getItem('name');
//     const email = sessionStorage.getItem('email');
//     const role = sessionStorage.getItem('role');

//     // 🔒 Admin route access
//     if (isAdminRoute) {
//       if (!(token && name && email && role === 'admin')) {
//         this.router.navigate(['/notfounderror404']);
//         return;
//       }
//       this.isHotelVendor = false; // ensure correct header
//     }

//     // 🔒 Hotel vendor access
//     else if (isHotelVendorRoute) {
//       if (!(token && name && email && role === 'hotel_vendor')) {
//         this.router.navigate(['/notfounderror404']);
//         return;
//       }
//       this.isHotelVendor = true;
//     }

//     // 🔹 For all other non-admin and non-vendor routes
//     else {
//       this.isHotelVendor = false;
//     }
//   }
// });

  }
}
