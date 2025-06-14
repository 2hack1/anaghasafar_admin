import { Routes } from '@angular/router';
import { Destinations } from './shared/components/destinations/destinations';
import { DeskBoard } from './shared/components/desk-board/desk-board';
import { Destination } from './shared/components/sub_destination/destination';
import { Packages } from './shared/components/packages/packages';
import { Check } from './shared/components/check/check';

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
    }
];
