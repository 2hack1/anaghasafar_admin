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
    canActivate: [authGuard]
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
  }

    // {
    //      path: " ",
    //     component: DeskBoard
    // }, {
    //     path: "destination",
    //     component: Destinations
    // }, {
    //     path: "sub-des/:id",
    //     component: Destination
    // }, {
    //     path: "packages/:id",
    //     component: Packages
    // }, {
    //     path: "checkit",
    //     component: Check
    // }, {
    //     path: "aboutTripOfPackage/:id",
    //     component: AboutPackage
    // }, {
    //     path: "HomeCards",
    //     component: HomefourCard
    // }, {
    //     path: "PlanenewTrip",
    //     component: HomePlaneNewTrip
    // }, {
    //     path: "topImage",
    //     component: Topimage
    // }, {
    //     path: "login",
    //     component: Login
    // },
];
