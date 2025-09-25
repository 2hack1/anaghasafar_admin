import { Component, OnInit } from '@angular/core';
import { UserServices } from '../../../core/services/user-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review',
  imports: [ CommonModule],
  templateUrl: './review.html',
  styleUrl: './review.scss'
})
export class Review implements OnInit{



  ngOnInit(): void {
    this.getbookingsdata();
  }
  constructor(private userservice:UserServices){}
  bokingdata:any;

 getbookingsdata(){
  const id= sessionStorage.getItem('id');
  this.userservice.getbookingDetails(id).subscribe((res:any)=>{
    // console.log(res,"booking details:");
    this.bokingdata=res;
  })
 }
}
