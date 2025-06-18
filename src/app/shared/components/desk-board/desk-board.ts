import { Component, OnInit } from '@angular/core';
import { UserServices } from '../../../core/services/user-services';

@Component({
  selector: 'app-desk-board',
  imports: [ ],
  templateUrl: './desk-board.html',
  styleUrl: './desk-board.scss'
})
export class DeskBoard implements OnInit {
  
  bookings:any;
  
  ngOnInit(): void {
  this.getBookings();
  }

constructor(private service:UserServices){}
 
getBookings(): void {
    this.service.getUserPlanTrip().subscribe((res) => {
      this.bookings = res;
    });
  }


}
