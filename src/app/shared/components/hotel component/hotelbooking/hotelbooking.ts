import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserServices } from '../../../../core/services/user-services';
import { NotifierModule, NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-hotelbooking',
  imports: [CommonModule ,NotifierModule],
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
  if (localStorage.getItem('roomAssignSuccess') === 'true') {
    this.notifier.notify('success', 'Room no. assigned successfully ✅');
    // Clear the flag so it doesn’t repeat
    localStorage.removeItem('roomAssignSuccess');
  }
  this.getbooking();
}

constructor(private userservice:UserServices , private notifier: NotifierService){

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
    console.log("Selected number of rooms:", this.roomsFirstly);
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

  bookingdata:any=[];
getbooking(){

  this.userservice.getHotelboking().subscribe({
   
      next: (res: any) => {
      console.log("Response Response:", res);
      this.bookingdata=res;
      console.log( this.bookingdata[0].hotel_vendor.hotelname
,"bookingdata:");
      // 👉 handle your success response here
    },
    error: (err: any) => {
      console.error("Error:", err);
      // 👉 handle error here
    },

  })

}


hotleroomdata={
  email:'',
  id:'',
  name:'',
  roomtype:'',
  hotelname:'',

}

hoteldata(id:any,email:string,name:string,roomtype:string,hotelname:any){
  console.log("lsjdlkfjlsdlflsdlflsj lndlfj");

  this.toggleGuestsModalFirstly();
  console.log(this.hotleroomdata,"hotleroomdata:", id,email,name,roomtype,hotelname);
 this.hotleroomdata.id=id.toString();
    this.hotleroomdata.email=email;
    this.hotleroomdata.name=name;
    this.hotleroomdata.roomtype=roomtype;
    this.hotleroomdata.hotelname=hotelname;
}
//  booking.id,booking.user.email,booking.user.name,booking.hotel_room.roomType,booking.hotel.hotel_name
// 
// ********************************************************************************************************
/** Toggle Guests Modal */
toggleGuestsModalFirstly( ) {
   
   
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

isAdding: boolean = false;

applyGuestsFirstly() {
  this.isAdding = true; // start spinner
 this.showGuestsModalFirstly=false
  if (this.roomsFirstly < 1) {
    confirm("You have selected only 1 room. Are you sure?");
  } else {
    confirm(`You have selected ${this.roomsFirstly} room(s).`);
  }

  // ❌ I think you don’t need this line twice:
  // this.userservice.setRoomno({room_no: this.roomsFirstly}, this.bookingdata.id).subscribe(...)

  if (
    this.hotleroomdata.id &&
    this.hotleroomdata.email &&
    this.hotleroomdata.name &&
    this.hotleroomdata.roomtype &&
    this.hotleroomdata.hotelname
  ) {
    const confirmAction = window.confirm("Are you sure you want to assign this room?");
    if (!confirmAction) {
      alert("Room assignment canceled ❌");
      this.isAdding = false; // ✅ stop spinner
      return;
    }

    const form = new FormData();
    form.append('email', this.hotleroomdata.email);
    form.append('hotel_name', this.hotleroomdata.hotelname);
    form.append('roomType', this.hotleroomdata.roomtype);
    form.append('room_no', this.roomsFirstly.toString());
    form.append('user_name', this.hotleroomdata.name);

    this.userservice.setRoomno(form, this.hotleroomdata.id).subscribe({
      next: (res: any) => {
        localStorage.setItem('roomAssignSuccess', 'true');
        alert("Room assigned successfully ✅");
        this.getbooking();
        this.isAdding = false; // ✅ stop spinner after success
        window.location.reload();
       
      },
      error: (err:any) => {
        console.error(err);
        
  if (err.status === 404) {
    this.notifier.notify('error', err.error.message || 'Booking not found ❌');
  } else if (err.status === 409) {
    this.notifier.notify('error', err.error.message);
  } else {
    this.notifier.notify('error', 'Something went wrong ❌');
  }
    this.isAdding = false; // ✅ stop spinner after error
      },
      complete: () => {
        // this.toggleGuestsModalFirstly();
         this.showGuestsModalFirstly=false
        this.updateTotalsFirstly();
      }
    });
  } else {
    this.isAdding = false; // ✅ in case data missing
  }
}

  
  
  /** Update the displayed totals */



  private updateTotalsFirstly() {
    this.totalGuestsFirstly = this.roomsFirstly;
  }
  
  // ********************************************************************************************************

editBooking(booking: any) {
  console.log("Edit booking:", booking);
}

deleteBooking(booking: any) {
  console.log("Delete booking:", booking);
}
calculateNights(checkIn: string, checkOut: string): number {
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const diffTime = Math.abs(outDate.getTime() - inDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

}
