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

 
  
  showGuestsModalFirstly: boolean = false;
  // Room values
  roomsFirstly: number = 1;
  maxRoomsFirstly: number = Infinity;
  // Displayed value on the <span>
  totalGuestsFirstly: number = this.roomsFirstly;
  
// ******************************

  showGuestsModal: boolean = false;
  step: number = 1;
  isAnimating: boolean = false;
    currentPage: number = 0;
     totalPages: number = 0;
       currentRange: number[] = [];
        totalGuests: number | null = null;
         rangesPerPage: number = 9;
           allRanges: {
    start: number,
    end: number
  }[] = [];
// ***********************************
ngOnInit(): void {
  // start whaen used it
  
  // this.getbooking();
}

constructor(private userservice:UserServices ){

  for (let i = 1; i <= 1000; i += 20) {
      this.allRanges.push({ start: i, end: i + 19 }

      );
    }
    // Calculate total pages based on ranges 
    this.totalPages = Math.ceil(this.allRanges.length / this.rangesPerPage);
}

 toggleGuestsModal() {
    this.showGuestsModal = !this.showGuestsModal;
    this.step = 1;
    this.currentPage = 0;
  }
    selectNumber(num: number) {
    // that place i am transfer values in the two model 
    this.roomsFirstly = num;
    this.toggleGuestsModal();
  }
    nextPage() {
    if ((this.currentPage + 1) * this.rangesPerPage < this.allRanges.length) {
      this.triggerPageChange(() => this.currentPage++);
    }
  }
    private triggerPageChange(changeFn: Function) {
    this.isAnimating = true;
    setTimeout(() => {
      changeFn();
      this.isAnimating = false;
    }, 80);
  }

   selectRange(start: number, end: number) {
    this.currentRange = Array.from(
      { length: end - start + 1 }, (_, i) => start + i);
    this.step = 2;
  }

    get pagedRanges() {
    const start = this.currentPage * this.rangesPerPage;
    return this.allRanges.slice(start, start + this.rangesPerPage);
  }

    prevPage() {
    if (this.currentPage > 0) {
      this.triggerPageChange(() => this.currentPage--);
    }
  }
// getbooking(){

//   this.userservice.getHotelboking().subscribe({
   
//       next: (res: any) => {
//       console.log("Response:", res);
//       // 👉 handle your success response here
//     },
//     error: (err: any) => {
//       console.error("Error:", err);
//       // 👉 handle error here
//     },

//   })

// }

// ********************************************************************************************************
/** Toggle Guests Modal */
toggleGuestsModalFirstly() {
    this.showGuestsModalFirstly = !this.showGuestsModalFirstly;
  } /** Increment Rooms */
  incRoomsFirstly() {
    if (this.roomsFirstly < this.maxRoomsFirstly) { this.roomsFirstly++; 
      this.updateTotalsFirstly(); }
  } /** Decrement Rooms */
  decRoomsFirstly() {
    if (this.roomsFirstly > 1) {
      this.roomsFirstly--; 
      this.updateTotalsFirstly();
    }
  }
  /** Apply Button */
  applyGuestsFirstly() {
    this.updateTotalsFirstly(); this.toggleGuestsModalFirstly();
  } /** Update the displayed totals */
  private updateTotalsFirstly() {
    this.totalGuestsFirstly = this.roomsFirstly;
  }
  
  // ********************************************************************************************************



}
