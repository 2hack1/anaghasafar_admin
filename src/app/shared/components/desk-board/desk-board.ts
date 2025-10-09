import { Component, OnInit } from '@angular/core';
import { UserServices } from '../../../core/services/user-services';

@Component({
  selector: 'app-desk-board',
  imports: [ ],
  templateUrl: './desk-board.html',
  styleUrl: './desk-board.scss'
})
export class DeskBoard implements OnInit {
  
  bookings:any;
  
  ngOnInit(): void {
  this.getBookings();
  this.gethoteldata();
  }

constructor(private service:UserServices){}
 

getdesckboradData:any;
gethoteldata(){
  this.service.gethoteldeskondestination().subscribe((res:any)=>{
console.log(res);
this.getdesckboradData=res;
  })
}

getBookings(): void {
    this.service.getUserPlanTrip().subscribe((res) => {
      this.bookings = res;
    });
  }

}
