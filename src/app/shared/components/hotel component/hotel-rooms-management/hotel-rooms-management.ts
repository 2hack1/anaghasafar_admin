import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServices } from '../../../../core/services/user-services';

@Component({
  selector: 'app-hotel-rooms-management',
  imports: [],
  templateUrl: './hotel-rooms-management.html',
  styleUrl: './hotel-rooms-management.scss'
})
export class HotelRoomsManagement implements OnInit {

  constructor(private route:Router ,private service:UserServices){}
  ngOnInit(): void {
    
    this.getRoomsData();
  }

getRoomsData(){
  this.service.getAllHotelRooms().subscribe((res:any)=>{
    console.log("res :",res)
  })
}


  resirect() {
  
    this.route.navigate(['deskboard/hotel-rooms']);
  }
}
