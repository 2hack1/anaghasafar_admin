import { Routes } from '@angular/router';
import { Destinations } from './shared/components/destinations/destinations';
import { DeskBoard } from './shared/components/desk-board/desk-board';
import { Destination } from './shared/components/sub_destination/destination';
import { Packages } from './shared/components/packages/packages';
import { Check } from './shared/components/check/check';
import { AboutPackage } from './shared/components/about-package/about-package';
import { HomePlaneNewTrip } from './shared/components/home-plane-new-trip/home-plane-new-trip';
import { HomefourCard } from './shared/components/homefour-card/homefour-card';
import { Topimage } from './shared/components/topimage/topimage';
import { Login } from './shared/components/login/login';
import { authGuard } from './auth-guard';
import { UserTourOrder } from './shared/components/user-tour-order/user-tour-order';
import { AboutUserTourOrder } from './shared/components/about-user-tour-order/about-user-tour-order';
import { HotelVendorForm } from './shared/components/hotel-vendor-form/hotel-vendor-form';
import { HotelVendorHeader } from './shared/components/hotel-vendor-header/hotel-vendor-header';
import { Pagenotfound } from './shared/components/pagenotfound/pagenotfound';
import { VendorDeskboard } from './shared/components/vendor-deskboard/vendor-deskboard';
import { Review } from './shared/components/review/review';
import { HotelRoomsManagement } from './shared/components/hotel-rooms-management/hotel-rooms-management';
import { Hotelbooking } from './shared/components/hotelbooking/hotelbooking';



export const routes: Routes = [

    {
    path: "",
    component: DeskBoard,
    canActivate: [authGuard] // ✅ dashboard protected
  },
  {
    path: "destination",
    component: Destinations,
    canActivate: [authGuard]
  },
  {
    path: "sub-des/:id",
    component: Destination,
    canActivate: [authGuard]
  },
  {
    path: "packages/:id",
    component: Packages,
    canActivate: [authGuard]
  },
  {
    path: "checkit",
    component: Check,
    // canActivate: [authGuard]
  },
  {
    path: "aboutTripOfPackage/:id",
    component: AboutPackage,
    canActivate: [authGuard]
  },

  {
    path: "HomeCards",
    component: HomefourCard,
    canActivate: [authGuard]
  },

  {
    path: "PlanenewTrip",
    component: HomePlaneNewTrip,
    canActivate: [authGuard]
  },

  {
    path: "topImage",
    component: Topimage,
    canActivate: [authGuard]
  },

  {
    path: "login",
    component: Login 
  },
  {
    path:"userOrder",
    component:UserTourOrder
    ,canActivate: [authGuard]
  },
  {
    path:"orderAbout/:id",
    component:AboutUserTourOrder,
     canActivate: [authGuard]
  },{
    path:"hotelVendorForm",
    component:HotelVendorForm
  
  },{ 
    path:"deskboard",
  component: VendorDeskboard 
  },{

     path:"deskboard/review",
  component: Review
  },{
       path:"deskboard/rooms",
      component: HotelRoomsManagement
  },{
    path:"notfounderror404",
    component:Pagenotfound
  },{
     path:"deskboard/booking",
      component: Hotelbooking
  },
  
  {
  path: '**',
 component:Pagenotfound
}

];
