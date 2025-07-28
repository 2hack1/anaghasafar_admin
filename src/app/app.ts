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
    

   console.log("form check",this.isLoginPage);

    console.log("status", this.status);
     this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
     const loginLikePages = ['/login', '/hotelVendorForm','/deskboard','/notfounderror404']; // add more if needed
       this.isLoginPage = loginLikePages.includes(event.urlAfterRedirects);

        
  const adminStaticRoutes = ['/', '/destination', '/checkit',  , '/HomeCards', '/PlanenewTrip', '/topimage', '/userTourOrder','/userOrder' ];
   // Routes that start with a path (e.g., dynamic :id)
    const adminDynamicRoutePrefixes = ['/orderAbout/','/sub-des/','/packages/','/aboutTripOfPackage/' ];

    // Check if current URL matches any of the routes
    const isAdminRoute =
      adminStaticRoutes.includes(event.urlAfterRedirects) ||
      adminDynamicRoutePrefixes.some(prefix =>
        event.urlAfterRedirects.startsWith(prefix)
      );


         if (isAdminRoute) {
      const token = sessionStorage.getItem('token');
      const name = sessionStorage.getItem('name');
      const email = sessionStorage.getItem('email');
     
      if (token && name === 'admin' && email === 'admin123@gmail.com') {
        console.log('Access granted to /des');
      } else {
        console.log('Invalid session. Redirecting...');
        this.router.navigate(['/notfounderror404']); // or show error message
      }

      } else if (event.urlAfterRedirects === '/deskboard' ) {
                     
       const token = sessionStorage.getItem('token');
      const name = sessionStorage.getItem('name');
      const email = sessionStorage.getItem('email');
      const role = sessionStorage.getItem('role');
    
       if (token && name && email && role === 'hotel_vendor') {
        console.log('Access granted to /desbord');
      } else {
        this.router.navigate(['/notfounderror404']); // or show error message
      }
      }
    }
  
    });
  }
}
