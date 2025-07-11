import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-tour-order',
  imports: [ CommonModule],
  templateUrl: './user-tour-order.html',
  styleUrl: './user-tour-order.scss'
})
export class UserTourOrder {

 users = [
    { name: 'Rahul Mehta', place: 'Pune', created: '2025-07-10 11:00' },
    { name: 'Neha Verma', place: 'Bangalore', created: '2025-07-08 09:30' },
  ];

  showUser(user: any) {
    alert(`User Details:\n\nName: ${user.name}\nPlace: ${user.place}\nCreated At: ${user.created}`);
  }

  deleteUser(user: any) {
    this.users = this.users.filter(u => u !== user);
    
  }


}
