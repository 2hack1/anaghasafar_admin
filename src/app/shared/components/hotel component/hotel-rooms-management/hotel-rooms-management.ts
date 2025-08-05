import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServices } from '../../../../core/services/user-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-rooms-management',
  imports: [CommonModule],
  templateUrl: './hotel-rooms-management.html',
  styleUrl: './hotel-rooms-management.scss'
})
export class HotelRoomsManagement implements OnInit {
  mainImageUrl = 'https://picsum.photos/id/1018/800/600'; // Default main image
  alldata: any;
  thumbnails = [
    'https://picsum.photos/id/1018/800/600',
    'https://picsum.photos/id/1021/120/80',
    'https://picsum.photos/id/1018/600/400',
    'https://picsum.photos/id/1021/120/80',

  ];
  constructor(private route: Router, private service: UserServices) { }
  ngOnInit(): void {
    this.getRoomsData();
    if (this.thumbnails.length > 0) {
      this.mainImageUrl = this.thumbnails[0];
    }

  }

  getRoomsData() {
    this.service.getAllHotelRooms().subscribe((res: any) => {
      console.log("res:",res.data);
      this.alldata = res.data.map((room: any) => ({
        ...room,
        mainImageUrl: room.rooms_image?.[0] || '' // Set default main image
      }));
    });
  }

  resirect() {
    this.route.navigate(['deskboard/hotel-rooms']);
  }

  resetMainImage(room: any) {
    room.mainImageUrl = room.rooms_image?.[0] || '';
  }

  changeMainImage(room: any, imageUrl: string) {
    room.mainImageUrl = imageUrl;
  }


  showAllAmenities: boolean = false;

  toggleAmenities() {
    this.showAllAmenities = !this.showAllAmenities;
  }
  redirect(id :any){
    this.route.navigate(['deskboard/hotel-rooms/edit/',id]);
    
    // this.service.editHotelRoom=id;
  }
}
