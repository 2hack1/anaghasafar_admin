import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServices } from '../../../../core/services/user-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-room-details',
  imports: [CommonModule],
  templateUrl: './show-room-details.html',
  styleUrl: './show-room-details.scss'
})
export class ShowRoomDetails {
  roomId:any;
  data:any;
    mainImage:any;
  alldata: { label: string, value: any }[] = [];
 constructor(private route: Router, private service: UserServices,private activate:ActivatedRoute) { }
  ngOnInit(): void {
this.roomId= this.activate.snapshot.paramMap.get('id');
     
    this.getRoomsData(this.roomId);
  }


 

  thumbnails = [
    'https://r1imghtlak.mmtcdn.com/ff0e99a8717b11e99c800242ac110003.jpeg',
    'https://r1imghtlak.mmtcdn.com/91dfae0c717c11e98c720242ac110002.jpeg',
    'https://r1imghtlak.mmtcdn.com/28afb82a077f11eaa5450242ac110003.jpg',
  ]
  rooms_image = Array(3)
  0 = "https://r1imghtlak.mmtcdn.com/ff0e99a8717b11e99c800242ac110003.jpeg";
  1 = "https://r1imghtlak.mmtcdn.com/ff0e99a8717b11e99c800242ac110003.jpeg";
  2 = "https://r1imghtlak.mmtcdn.com/ff0e99a8717b11e99c800242ac110003.jpeg";


  
  updateMainImage(image: string) {
    this.mainImage = image;
  }



   cancellation_chargess:any;
getRoomsData(id:any) {
  // Replace this with your real API call
  this.service.gethotelroom(id).subscribe((res:any)=>{
      console.log("shwo room details :",res.data);
      const room=res.data;
      this.data=res.data;

    this.mainImage=this.data.rooms_image[0];
      if(room.cancellation_charges===0){
this.cancellation_chargess='free'
      }else{
           this.cancellation_chargess=room.cancellation_charges;
      }
    this.alldata = [
      { label: 'Booking Status', value: room.bookingStatus },
      { label: 'Check-In', value: room.checkInTime },
      { label: 'Check-Out', value: room.checkOutTime },
      { label: 'Cancellation', value: room.cancellationPolicy },
      { label: 'Cancellation Charges', value: `₹${this.cancellation_chargess}` },
      { label: 'Discount', value: `${room.discount}%` },
      { label: 'Extra Bed Charges', value: `₹${room.extraBedCharge}` },
      { label: 'Final Price', value: `₹${room.finalPrice}` },
      { label: 'Hotel Room ID', value: room.hotel_roomId },
      { label: 'Hotel Vendor ID', value: room.hotel_vendor_id },
      { label: 'Max Adults', value: room.maxAdults },
      { label: 'Max Children', value: room.maxChildren },
      { label: 'Number of Rooms', value: room.numRooms },
      { label: 'Number of Beds', value: room.numberOfBeds },
      { label: 'Room Type', value: room.roomType },
      { label: 'Tax Included', value: room.taxIncluded ? 'Yes' : 'No' },
      { label: 'Hotel Booking Time', value: new Date(room.created_at).toLocaleString() },
      { label: 'Amenties', value: room.amenities },
    ];
  });
}

edit(id:any){
  
  this.route.navigate(['deskboard/hotel-rooms/edit/',id])
}

  


}
