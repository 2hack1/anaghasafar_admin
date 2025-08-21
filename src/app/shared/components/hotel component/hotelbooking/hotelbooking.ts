import { Component } from '@angular/core';

@Component({
  selector: 'app-hotelbooking',
  imports: [],
  templateUrl: './hotelbooking.html',
  styleUrl: './hotelbooking.scss'
})
export class Hotelbooking {



  // Modal visibility state 
  showGuestsModal: boolean = false;
  // Room values
  rooms: number = 1;
  maxRooms: number = 20;
  // Displayed value on the <span>
  totalGuests: number = this.rooms;
  /** Toggle Guests Modal */
  toggleGuestsModal() {
    this.showGuestsModal = !this.showGuestsModal;
  } /** Increment Rooms */
  incRooms() {
    if (this.rooms < this.maxRooms) {
      this.rooms++; this.updateTotals();

    }
  } /** Decrement Rooms */
  decRooms() {
    if (this.rooms > 1

    ) {
      this.rooms--;
      this.updateTotals();
    }
  } /** Apply Button */
  applyGuests() {
    this.updateTotals();
    this.toggleGuestsModal();
  } /** Update the displayed totals */
  private updateTotals() {
    this.totalGuests = this.rooms;
  }

}
