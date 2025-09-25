import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServices } from '../../../core/services/user-services';
import { NotifierModule, NotifierService } from 'angular-notifier';
interface Vendor {
  hotel_vendor_id: number;
  name: string;
  email?: string;
  phone?: string;
  bank_account?: string;
  ifsc?: string;
  upi_id?: string;
  commission_percentage?: number;
  
}


@Component({
  selector: 'app-vendor-back-details',
  imports: [ReactiveFormsModule,CommonModule,NotifierModule,FormsModule],
  templateUrl: './vendor-back-details.html',
  styleUrl: './vendor-back-details.scss'
})
export class VendorBackDetails implements OnInit {
   vendorForm: FormGroup;
  vendorData: Vendor | null = null; // store the saved vendor details
  editMode: boolean = false;

  constructor(private fb: FormBuilder,private service:UserServices,private notifier:NotifierService) {
    this.vendorForm = this.fb.group({
      hotel_vendor_id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.email],
      phone: [''],
      bank_account: [''],
      ifsc: [''],
      upi_id: [''],
      commission_percentage: [10, [Validators.min(0), Validators.max(100)]],
 
    });
  }

  ngOnInit(): void {
    // Simulate fetching existing vendor data from API
    // For demo, you can comment this to test "no data present"
 const id = sessionStorage.getItem('trid');
  if (id) {
    this.getDeatail();
  }
   

    if (this.vendorData) {
      this.vendorForm.patchValue(this.vendorData);
      this.editMode = true;
    }
  }
     getDeatail(){
     const id = sessionStorage.getItem('trid');
  if (!id) return;

  this.service.getBankDetail(id).subscribe({
    next: (res: any) => {
      if (res.status) {
        this.vendorData = res.data;
        if (this.vendorData) {
  this.vendorForm.patchValue(this.vendorData);
}
      
        this.editMode = true;
      }
    },
    error: (err: any) => {
      console.error(err);
      this.notifier.notify('error', err.error.message || 'Failed to fetch details');
    }
  });

    }
    updateDetails(){
       const id=sessionStorage.getItem('trid'); 
       this.service.updateBankDetails(id, this.vendorForm.value).subscribe({
  next: (res:any)=>{
    this.notifier.notify('success', 'Vendor updated successfully');
    this.vendorForm.patchValue(res.data);
    this.editMode = true;
  },
  error: (err:any)=>{
    this.notifier.notify('error', err.error.message || 'Update failed');
  }
});


    }

 submitForm() {
  if (this.vendorForm.invalid) return;

  const payload = this.vendorForm.value; // pass form data
  const id = sessionStorage.getItem('trid');

  if (id) {
    // Update existing vendor
    this.service.updateBankDetails(id, payload).subscribe({
      next: (res: any) => {
        this.vendorForm.patchValue(res.data);
        this.notifier.notify('success', 'Vendor updated successfully');
        this.editMode = true;
      },
      error: (err: any) => {
        this.notifier.notify('error', err.error.message || 'Update failed');
      }
    });
  } else {
    // Add new vendor
    this.service.aadBankDetails(payload).subscribe({
      next: (res: any) => {
        this.vendorForm.patchValue(res.data);
        sessionStorage.setItem('trid', res.data.id);
        this.notifier.notify('success', 'Vendor added successfully');
        this.editMode = true;
      },
      error: (err: any) => {
        this.notifier.notify('error', err.error.message || 'Failed to add vendor');
      }
    });
  }
}

  enableEdit() {
    this.editMode = false;
  }
  onIfscInput(event: Event) {
  const input = event.target as HTMLInputElement; // cast to HTMLInputElement
  this.vendorForm.get('ifsc')?.setValue(input.value.toUpperCase(), { emitEvent: false });
}


}
