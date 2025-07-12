import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserServices } from '../../../core/services/user-services';

@Component({
  selector: 'app-user-tour-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-tour-order.html',
  styleUrl: './user-tour-order.scss'
})
export class UserTourOrder implements OnInit {
  searchText: string = '';
  users: any;
  ngOnInit(): void {
    this.getorderdata();
  }
  constructor(private us_: UserServices) { }
  get filteredUsers() {

    if (!this.searchText.trim()) {
      return this.users;
    }
    return this.users.filter((user: any) =>
      user.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  };

  confirm(id :any){

  }

  getorderdata() {
    this.us_.getOrderData().subscribe({
      next: (res: any) => {
        this.users = res;
        console.log(res);
      }, error: (err: any) => {
        console.log('check it')
      },
    })
  }
  showUser(user: any) {
    alert(`User Details:\n\nName: ${user.name}\nPlace: ${user.place}\nCreated At: ${user.created}`);
  }

  deleteUser(user: any) {
    // this.users = this.users.filter(u => u !== user);
  }

}
