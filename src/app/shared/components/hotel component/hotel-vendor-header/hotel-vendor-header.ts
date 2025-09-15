import { Component, NgModule, OnInit } from '@angular/core';
import { UserServices } from '../../../../core/services/user-services';
import { Auth } from '../../../../core/services/auth';
import { Route, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotifierModule, NotifierService } from 'angular-notifier';
;


@Component({
  selector: 'app-hotel-vendor-header',
  imports: [RouterLink, CommonModule,FormsModule,NotifierModule ],
  templateUrl: './hotel-vendor-header.html',
  styleUrl: './hotel-vendor-header.scss'
})
export class HotelVendorHeader implements OnInit {
  public isMobileView: boolean = true;
  name: any;
  selectedNotification: any = null;

  ngOnInit(): void {
    this.name = sessionStorage.getItem('name')
    this.getNortification();
    this.getvernorDetails();
  
  }



  constructor(private user: UserServices, private auth: Auth ,private route:Router,private notifier:NotifierService) { }

getvernorDetails(){
    const id=  sessionStorage.getItem('id')
  this.user.getvendorDetails(id).subscribe((res:any)=>{
    console.log("vendor details", res); 
    this.editName =res.vendor.vendor_name;
    this.editEmail=res.vendor.vendor_email;
  })
}
  randerBooking(){
 this.route.navigate(['/deskboard/booking'])
 this.showMessagesModal = false;
  }
  notifications: any = [];
  getNortification() {
    this.user.notifications().subscribe((res: any) => {
      console.log("notifications", res);
      this.notifications = res;
    })
  }

  toggleTarget() {
    // this.togel=!this.togel;
    this.isMobileView = !this.isMobileView;
    console.log(this.isMobileView);

    this.user.toggle();
  }


  destinations: any[] = [];
  subsByDestination: { [key: string]: any[] } = {};
  packagesBySub: { [key: string]: any[] } = {};

  // Simulated backend data
  allDestinations: any = [
    { id: 1, name: 'Show Destinations' },

  ];

  allSubs: any = {
    1: [{ id: 101, name: 'MP' }, { id: 102, name: 'UP' }],
    2: [{ id: 201, name: 'California' }]
  };


  allPackages: any = {
    101: [{ name: 'Gwalior' }, { name: 'Indore' }],
    102: [{ name: 'Agra' }, { name: 'Varanasi' }],
    201: [{ name: 'Los Angeles' }, { name: 'San Francisco' }]
  };

  loadDestinations() {
    if (this.destinations.length === 0) {
      this.destinations = this.allDestinations;
    }
  }

  loadSubDestinations(dest: any) {
    if (!this.subsByDestination[dest.id]) {
      this.subsByDestination[dest.id] = this.allSubs[dest.id] || [];
    }
  }

  loadPackages(sub: any) {
    if (!this.packagesBySub[sub.id]) {
      this.packagesBySub[sub.id] = this.allPackages[sub.id] || [];
    }
  }

  logoutt() {
    this.auth.logout();
  }

  showMessagesModal = false;
  openMessagesModal(norti: any) {
    this.selectedNotification = norti;
    this.showMessagesModal = true;
    console.log("Notification details:", norti);
  }
  closeMessagesModal() {
    this.showMessagesModal = false;
    this.selectedNotification = null;
  }


  // side bar user profile

  users = {
     names: 'Admin Name', emails: 'admin@example.com'
     };
  isEditing = false; editName = ''; editEmail = '';

  startEdit() {
    this.isEditing = true; 
    // this.editName = this.users.names; 
    // this.editEmail = this.users.emails;
  }

  saveEdit() {
  if (!confirm("Are you sure you want to update vendor details?")) {
    return; // user canceled
  }

  console.log('Name:', this.editName); 
  console.log('Email:', this.editEmail);

  const form = new FormData(); 
  form.append('vendor_name', this.editName);
  form.append('vendor_email', this.editEmail);

  this.user.updateNotification(1, form).subscribe({
    next: (res: any) => {
      console.log("Update response:", res);

      // ✅ success notify
      
      // update UI
      this.users.names = this.editName; 
      this.users.emails = this.editEmail;
      this.isEditing = false;
      this.notifier.notify('success', res.message || 'Vendor updated successfully ✅');
    },
    error: (err: any) => {
      console.error("Update error:", err);
      this.notifier.notify('error', err.error?.message || 'Something went wrong ❌');
    }
  });
}

   cancelEdit() { this.isEditing = false; }

 

   notworking(){
    alert("This feature is not available now  yet ❌");
   }
}
