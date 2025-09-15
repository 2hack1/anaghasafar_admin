import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserServices } from '../../../core/services/user-services';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-vendor-deskboard',
  imports: [RouterLink,CommonModule],
  templateUrl: './vendor-deskboard.html',
  styleUrl: './vendor-deskboard.scss'
})
export class VendorDeskboard implements OnInit {


  ngOnInit(): void {
    
    this.getbookingsdata();
    this.getprofiledata();
  }

  constructor( private userservice:UserServices){}

bokingdata:any;
   getbookingsdata(){
  const id= sessionStorage.getItem('id');
  this.userservice.getbookingDetails(id).subscribe((res:any)=>{
    console.log(res,"booking details:");
    this.bokingdata=res;
  })
 }


 userdata:any;

 getprofiledata(){
 this.userservice.userDataForHotelDeskboard(sessionStorage.getItem('id')).subscribe((res:any)=>{
     console.log(res,"user details:");
     this.userdata=res.bookings
 });
}
}
