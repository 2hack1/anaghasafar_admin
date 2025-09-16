import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-hotel-policy',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './hotel-policy.html',
  styleUrl: './hotel-policy.scss'
})
export class HotelPolicy implements OnInit {

  ngOnInit(): void {

  }
  // the is page again check
  cancellation = { bookingId: '', email: '', reason: '', agree: false };
  submitCancellation() {
    if (this.cancellation.agree) {
      console.log("Cancellation Request Submitted:", this.cancellation);
      alert("Your cancellation request has been submitted.");
    }
    else {
      alert("Please agree to the cancellation policy before submitting Are you sure!");

    }
  }
  policyList = [{ value: 'cancel', label: 'Cancellation & Refund Policy' },
  { value: 'pay', label: 'Payment Policy' },
  { value: 'last', label: 'Last-Minute Cancellation Policy' },
  { value: 'Refund', label: 'Non-Refundable Policy' },
  { value: 'Moderate Policy', label: 'Moderate Policy' },
  { value: 'Late', label: 'Late Arrival / Check-in Policy' },
  { value: 'flex', label: 'Flexible Policy' },
  { value: 'Early', label: 'Early Departure Policy' }];
  selectedPolicies: any = {
    cancel: false, pay: false, last: false,
    Refund: false, Moderate: false, late: false, flex: false, early: false
  };
  policyDetails: any = {
    cancel: '', pay: '', last: '', Refund: '', Moderate: '', late: '',
    flex: '', false: ''
  }; cancellation1 = { agree: false };
  submitCancellation1() {
    console.log('Selected Policies:', this.selectedPolicies);
    console.log('Policy Details:', this.policyDetails);
  }
}