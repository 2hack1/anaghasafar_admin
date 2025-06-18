import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServices } from '../../../core/services/user-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-package',
  imports: [CommonModule],
  templateUrl: './about-package.html',
  styleUrl: './about-package.scss'
})
export class AboutPackage implements OnInit {
  
  packageId:any;
packages:any;
itineries:any;
transport:any;
monthDate:any;
objectKeys = Object.keys;
constructor(private activateRout:ActivatedRoute,private service:UserServices){

}

  ngOnInit(): void {
    
    this.packageId=this.activateRout.snapshot.paramMap.get('id');
    console.log(this.packageId);
    this.getItinaries(this.packageId);
    this.getMonth(this.packageId);
    this.getPackage(this.packageId);
    this.getTrasnsport(this.packageId);
  }

  getPackage( packageId:any){
    this.service.getperticular(packageId).subscribe((res)=>{
     this.packages=res;
     console.log("packages",this.packages)
     
    })
// getperticular(sub_des_id: number) {
//     return this.http.get(`http://localhost:8000/api/packages/${sub_des_id}/details`);
//   }
  }
  
  getItinaries(packageId:any){
    this.service.getitineries(packageId).subscribe((res)=>{
   this.itineries=res;
  console.log("itineries",this.itineries);
    })

// getitineries(package_id:any){
//        return this.http.get(`${this.apiUrl}itineraries/${package_id}`);
//   }
  }
getTrasnsport(packageId:any){
 
  this.service.getTransportation(packageId).subscribe((res)=>{

    this.transport=res;
    console.log("transport",this.transport);
  })
// getTransportation(package_id:any){
//     return this.http.get(`${this.apiUrl}transports/${package_id}`);
//   }
} 
  getMonth(packageId:any){
    this.service.getMonth(packageId).subscribe((res)=>{
      this.monthDate=res;
      console.log("month",this.monthDate);
    })

  // getMonth(package_id:number){
  //   return this.http.get(`http://localhost:8000/api/months/${package_id}`);
  // }
  }


}
