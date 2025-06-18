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

export const routes: Routes = [

    {
        path: "",
        component: DeskBoard
    }, {
        path: "destination",
        component: Destinations
    }, {
        path: "sub-des/:id",
        component: Destination
    }, {
        path: "packages/:id",
        component: Packages
    },{
        path:"checkit",
        component:Check
    },{
        path:"aboutTripOfPackage/:id",
        component:AboutPackage
    },{
        path:"HomeCards",
        component:HomefourCard
    },{
        path:"PlanenewTrip",
        component:HomePlaneNewTrip
    },{
        path:"topImage",
        component:Topimage
    }
];
