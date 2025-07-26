import { Component } from '@angular/core';
import { UserServices } from '../../../core/services/user-services';
import { Auth } from '../../../core/services/auth';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-vendor-header',
  imports: [RouterLink , CommonModule],
  templateUrl: './hotel-vendor-header.html',
  styleUrl: './hotel-vendor-header.scss'
})
export class HotelVendorHeader {
 public isMobileView: boolean = true;
  name: any;

  ngOnInit(): void {
    this.name = sessionStorage.getItem('name')
  }

  
  constructor(private user: UserServices, private auth: Auth) { }

  toggleTarget() {
    // this.togel=!this.togel;
    this.isMobileView = !this.isMobileView;
    console.log(this.isMobileView);

    this.user.toggle();
  }


  destinations: any[] = [];
  subsByDestination: { [key: string]: any[] } = {};
  packagesBySub: { [key: string]: any[] } = {};

  // Simulated backend data
  allDestinations: any = [
    { id: 1, name: 'Show Destinations' },

  ];

  allSubs: any = {
    1: [{ id: 101, name: 'MP' }, { id: 102, name: 'UP' }],
    2: [{ id: 201, name: 'California' }]
  };


  allPackages: any = {
    101: [{ name: 'Gwalior' }, { name: 'Indore' }],
    102: [{ name: 'Agra' }, { name: 'Varanasi' }],
    201: [{ name: 'Los Angeles' }, { name: 'San Francisco' }]
  };

  loadDestinations() {
    if (this.destinations.length === 0) {
      this.destinations = this.allDestinations;
    }
  }

  loadSubDestinations(dest: any) {
    if (!this.subsByDestination[dest.id]) {
      this.subsByDestination[dest.id] = this.allSubs[dest.id] || [];
    }
  }

  loadPackages(sub: any) {
    if (!this.packagesBySub[sub.id]) {
      this.packagesBySub[sub.id] = this.allPackages[sub.id] || [];
    }
  }

  logoutt() {
    this.auth.logout();
  }
}
