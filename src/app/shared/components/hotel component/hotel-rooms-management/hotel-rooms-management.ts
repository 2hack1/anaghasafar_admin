import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-rooms-management',
  imports: [],
  templateUrl: './hotel-rooms-management.html',
  styleUrl: './hotel-rooms-management.scss'
})
export class HotelRoomsManagement {

  constructor(private route:Router){}
  resirect() {
  
    this.route.navigate(['deskboard/hotel-rooms']);
  }
}
