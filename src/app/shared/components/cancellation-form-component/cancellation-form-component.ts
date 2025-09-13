
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-cancellation-form',
  templateUrl: './cancellation-form-component.html',
  styleUrl: './cancellation-form-component.scss',
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class CancellationFormComponent {
  cancellation = {
    bookingId: '',
    email: '',
    reason: '',
    agree: false
  };

  submitCancellation() {
    if (this.cancellation.agree) {
      console.log("Cancellation Request Submitted:", this.cancellation);
      alert("Your cancellation request has been submitted.");

    } else {
      alert("Please agree to the cancellation policy before submitting Are you sure!");
    }
  }


  policyList = [
    { value: 'cancel', label: 'Cancellation & Refund Policy' },
    { value: 'pay', label: 'Payment Policy' },
    { value: 'last', label: 'Last-Minute Cancellation Policy' },
    { value: 'Refund', label: 'Non-Refundable Policy' },
    { value: 'Moderate Policy', label: 'Moderate Policy' },
    { value: 'Late', label: 'Late Arrival / Check-in Policy' },
    { value: 'flex', label: 'Flexible Policy' },
    { value: 'Early', label: 'Early Departure Policy' }

  ];

  selectedPolicies: any = {
    cancel: false,
    pay: false,
    last: false,
    Refund: false,
    Moderate: false,
    late: false,
    flex: false,
    early: false
  };

  policyDetails: any = {
    cancel: '',
    pay: '',
    last: '',
    Refund: '',
    Moderate: '',
    late: '',
    flex: '',
    false: ''

  };

  cancellation1 = {
    agree: false
  };

  submitCancellation1() {
    console.log('Selected Policies:', this.selectedPolicies);
    console.log('Policy Details:', this.policyDetails);
    // console.log('Agreed:', this.cancellation1.agree);
  }


}


