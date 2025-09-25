import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServices } from '../../../../core/services/user-services';
import { CommonModule } from '@angular/common';
import { NotifierService, NotifierModule } from 'angular-notifier';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-hotel-rooms-management',
  imports: [CommonModule, NotifierModule, FormsModule],
  templateUrl: './hotel-rooms-management.html',
  styleUrl: './hotel-rooms-management.scss'
})
export class HotelRoomsManagement implements OnInit {
  mainImageUrl = 'https://picsum.photos/id/1018/800/600'; // Default main image
env=environment;
  searchText: string = '';
  selectedType: string = 'all';
  filteredRooms: any[] = [];

  showAmenitiesMap: { [roomId: string]: boolean } = {};

  alldata: any;
  thumbnails = [
    'https://picsum.photos/id/1018/800/600',
    'https://picsum.photos/id/1021/120/80',
    'https://picsum.photos/id/1018/600/400',
    'https://picsum.photos/id/1021/120/80',

  ];
  constructor(private route: Router, private service: UserServices, private readonly notifier: NotifierService) { }
  ngOnInit(): void {
    this.getRoomsData();
    if (this.thumbnails.length > 0) {
      this.mainImageUrl = this.thumbnails[0];
    }
    if (this.service.norifilerrun === 1) {
      this.notifier.notify('success', 'successfully Upadate')
      this.service.norifilerrun = 0;
    }

    setInterval(() => {
      this.applyFilters();
    }, 300);
    // not
  }



  getRoomsData() {
    const id = sessionStorage.getItem('id');
    this.service.getHotelByid(id).subscribe((res: any) => {
      // console.log("res:", res.data[0].hotel_vendor_id);
      sessionStorage.setItem('vendorid',res.data[0].hotel_vendor_id);
      this.alldata = res.data.map((room: any) => ({
        ...room,
        mainImageUrl: room.rooms_image?.[0] || '' // Set default main image
      }));
      this.applyFilters(); // apply 
    });
  }
  filterByType(type: string) {
    this.selectedType = type;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredRooms = this.alldata.filter((room: any) => {
      const matchesType = this.selectedType === 'all' || room.roomType === this.selectedType;
      const matchesSearch = !this.searchText || room.roomType.toLowerCase().includes(this.searchText.toLowerCase());
      return matchesType && matchesSearch;
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

  toggleAmenities(roomId: string) {
    this.showAmenitiesMap[roomId] = !this.showAmenitiesMap[roomId];
  }
  redirect(id: any) {
    this.route.navigate(['deskboard/hotel-rooms/edit/', id]);

    // this.service.editHotelRoom=id;
  }

  deleteroom(id: any) {
    this.service.deleteRoomData(id).subscribe((res: any) => {
      // console.log("delete successfully");
      this.getRoomsData();
    })
  }

  redirected(id:any){
    this.route.navigate(['deskboard/hotel-rooms-details/',id])
  }
}
// deskboard/hotel-rooms-details
