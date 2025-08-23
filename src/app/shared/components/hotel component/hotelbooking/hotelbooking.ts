import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserServices } from '../../../../core/services/user-services';

@Component({
  selector: 'app-hotelbooking',
  imports: [CommonModule],
  templateUrl: './hotelbooking.html',
  styleUrl: './hotelbooking.scss'
})
export class Hotelbooking implements OnInit {


  showGuestsModal: boolean = false;
  // Room values
  rooms: number = 1;
  maxRooms: number = Infinity;
  // Displayed value on the <span>
  totalGuests: number = this.rooms;


ngOnInit(): void {
  // start whaen used it
  
  // this.getbooking();
}

constructor(private userservice:UserServices ){

}


getbooking(){

  this.userservice.getHotelboking().subscribe({
   
      next: (res: any) => {
      console.log("Response:", res);
      // 👉 handle your success response here
    },
    error: (err: any) => {
      console.error("Error:", err);
      // 👉 handle error here
    },

  })

}


  /** Toggle Guests Modal */
  toggleGuestsModal() {
    this.showGuestsModal = !this.showGuestsModal;
  } /** Increment Rooms */
  incRooms() {
    if (this.rooms < this.maxRooms) { this.rooms++; this.updateTotals(); }
  } /** Decrement Rooms */
  decRooms() {
    if (this.rooms > 1) {
      this.rooms--; this.updateTotals();
    }
  }
  /** Apply Button */
  applyGuests() {
    this.updateTotals(); this.toggleGuestsModal();
  } /** Update the displayed totals */
  private updateTotals() {
    this.totalGuests = this.rooms;
  }



  // http://localhost:8000/api/bookings

}
