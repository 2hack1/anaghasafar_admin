import { Component } from '@angular/core';
import { UserServices } from '../../../core/services/user-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-plane-new-trip',
  imports: [CommonModule],
  templateUrl: './home-plane-new-trip.html',
  styleUrl: './home-plane-new-trip.scss'
})
export class HomePlaneNewTrip {
bookings: any;

  constructor(private userService: UserServices) {}

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings(): void {
    this.userService.getUserPlanTrip().subscribe((res) => {
      this.bookings = res;
    });
  }

  deleteBooking(id: number): void {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    this.userService.DeleteUserPlanTrip(id).subscribe(() => {
      // this.bookings = this.bookings.filter(b => b.id !== id);
      this.getBookings();
      console.log("delete working",id);
    });
  }
}
