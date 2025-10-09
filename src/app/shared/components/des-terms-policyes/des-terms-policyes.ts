import { Component } from '@angular/core';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { UserServices } from '../../../core/services/user-services';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-des-terms-policyes',
  imports: [CommonModule, FormsModule,ReactiveFormsModule, NotifierModule],
  templateUrl: './des-terms-policyes.html',
  styleUrl: './des-terms-policyes.scss'
})
export class DesTermsPolicyes {
activePolicy: string = 'cancellation'; // default tab

  policyContents: any = {
    cancellation: '',
    payment: '',
    lastminute: '',
    nonrefundable: ''
  };
  ngOnInit(): void {

    if(localStorage.getItem('notify')==='success'){
      this.notifier.notify('success', 'Policy updated successfully');
    }
    localStorage.removeItem('notify');


    this.getvendor();
    
  }
  isAnyPolicySelected(): boolean {
  // Check if any selectedPolicies value is true
  return Object.values(this.selectedPolicies).some(val => val);
}

  showPolicy(policy: string) {
    this.activePolicy = policy;

    // console.log('Active Policy:', policy);
  }
  constructor(private notifier: NotifierService, private userservice: UserServices) { }
  // the is page again check

getvendor(){
  // this.userservice.getvendoralldata(this.id).subscribe((res:any)=>{
  //   // console.log(res,'vendor details');
  //   this.policyContents.cancellation=res.cancellation_refund_policy;
  //   this.policyContents.payment=res.payment_policy;
  //   this.policyContents.lastminute=res.privacy_policy;
  //   this.policyContents.nonrefundable=res.terms_conditions; 

  //   // this is how for  text area
  //   this.policyDetails.cancel=res.cancellation_refund_policy;
  //   this.policyDetails.pay=res.payment_policy;
  //   this.policyDetails.privacy=res.privacy_policy;
  //   this.policyDetails.terms=res.terms_conditions;
    
  // })
}


  policyList = [
    { value: 'cancel', label: 'Cancellation & Refund Policy' },
    { value: 'pay', label: 'Payment Policy' },
    { value: 'privacy', label: 'privacy Policy' },
    { value: 'terms', label: 'Terms & Conditions' }];

  selectedPolicies: any = {
    cancel: false, pay: false, privacy: false,
    terms: false
  };
  policyDetails: any = {
    cancel: '', pay: '', privacy: '', terms: '',
    flex: '', false: ''
  };
  cancellation1 = { agree: false };
  id = sessionStorage.getItem('id')
  submitCancellation1() {
    for (const policy in this.selectedPolicies) {
      if (this.selectedPolicies[policy]) {  // only selected policies
        const payload = { policy, details: this.policyDetails[policy] || '' };

        // Check if details exist
        if (!payload.details || payload.details.trim() === '') {
          // Show error notification
          let label = '';
          switch (policy) {
            case 'cancel': label = 'Cancellation'; break;
            case 'pay': label = 'Payment'; break;
            case 'privacy': label = 'Privacy'; break;
            case 'terms': label = 'Terms'; break;
          }
          this.notifier.notify('error', `Please fill ${label} policy details`);
        } else {
          // Call API since details are present
          switch (policy) {
            case 'cancel':

              // console.log('1Selected Policies:', this.selectedPolicies);
              const formcancel = new FormData();
              formcancel.append('cancellation_refund_policy', payload.details);
              // this.userservice.cancelPolisy(formcancel, this.id).subscribe((res) => {
                // console.log('Cancel API:', res);
                 window.location.reload();
                // localStorage.setItem('notify', 'success')
              // })
              break;

            case 'pay':
              // console.log('2Selected Policies:', this.selectedPolicies);
              const formpayment = new FormData();
              formpayment.append('payment_policy', payload.details);
              // this.userservice.paymentPolisy(formpayment, this.id).subscribe((res) => {
                // console.log('Pay API:', res);
                 window.location.reload();
                // localStorage.setItem('notify', 'success')
              // })
              break;

            case 'privacy':

              const formprivacy = new FormData();
              formprivacy.append('privacy_policy', payload.details);
              // this.userservice.privacyPolisy1(formprivacy, this.id).subscribe((res) => {
                // console.log('Privacy API:', res);
                 window.location.reload();
                // localStorage.setItem('notify', 'success')
              // })
              break;

            case 'terms':

              const formterms = new FormData();
              formterms.append('terms_conditions', payload.details);
              // this.userservice.termsPolisy(formterms, this.id).subscribe((res) => {
                // console.log('Terms API:', res);
                window.location.reload();
                // localStorage.setItem('notify', 'success')
              // });
              break;
          }
        }
      }
    }
  }

}
