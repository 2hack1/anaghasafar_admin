import { Component, OnInit } from '@angular/core';
import { UserServices } from '../../../core/services/user-services';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
 template: `<button (click)="toggleTarget()">Toggle</button>`,
})
export class Header implements OnInit{

  ngOnInit(): void {
    
  }
    constructor(private user:UserServices) {}

  toggleTarget() {
    this.user.toggle();
  }

 destinations: any[] = [];
  subsByDestination: { [key: string]: any[] } = {};
  packagesBySub: { [key: string]: any[] } = {};

  // Simulated backend data
   allDestinations:any = [
    { id: 1, name: 'Show Destinations' },
    
  ];

   allSubs:any = {
    1: [ { id: 101, name: 'MP' }, { id: 102, name: 'UP' } ],
    2: [ { id: 201, name: 'California' } ]
  };

   allPackages:any = {
    101: [ { name: 'Gwalior' }, { name: 'Indore' } ],
    102: [ { name: 'Agra' }, { name: 'Varanasi' } ],
    201: [ { name: 'Los Angeles' }, { name: 'San Francisco' } ]
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

}
