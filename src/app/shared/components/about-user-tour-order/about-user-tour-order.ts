import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { UserServices } from '../../../core/services/user-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-user-tour-order',
  imports: [ CommonModule],
  templateUrl: './about-user-tour-order.html',
  styleUrl: './about-user-tour-order.scss'
})
export class AboutUserTourOrder implements OnInit {

  orderId:Number=0;
  orderData:any;
constructor(private route:ActivatedRoute,private  service:UserServices){}

  ngOnInit(): void {
   this.orderId= Number(this.route.snapshot.paramMap.get('id'));
   console.log(this.orderId,'order id');
   this.getOrderData(this.orderId);
  }





  getOrderData(id:Number){

    this.service.getOrderById(id).subscribe((res:any)=>{
      console.log(res);
 this.orderData=res;
    })
  }




}
