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
// isLoginPagefor = true;
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
     const loginLikePages = ['/login', '/hotelVendorForm']; // add more if needed
       this.isLoginPage = loginLikePages.includes(event.urlAfterRedirects);

          const role = sessionStorage.getItem('role');
    this.isHotelVendor = role === 'hotel_vendor';
      } 
      //  else if (this.user.role === 'hotel_vendor') {
      //   console.log("check it");
      //    this.router.navigate(['/hotelVendor']);
      //     this.isLoginPagefor = false;
      //     this.isLoginPage = true;
      //   sessionStorage.setItem('token', '12321');

      //   }
    
    });
  }
}
