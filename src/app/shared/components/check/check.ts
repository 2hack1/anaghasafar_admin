import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServices } from '../../../core/services/user-services';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({ 
  selector: 'app-check',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './check.html',
  styleUrl: './check.scss'
})
export class Check implements OnInit {
 vendorForm: FormGroup;
  step = 0;
  steps = ['Vendor Info', 'Hotel Details', 'Location & Price', 'Uploads'];
  images: File[] = [];
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.vendorForm = this.fb.group({
      vendor_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
      hotel_name: ['', Validators.required],
      hotel_type: ['', Validators.required],
      total_rooms: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      price: ['', Validators.required],
      gst_number: ['']
    });
  }

  isInvalid(field: string): boolean {
    const control = this.vendorForm.get(field);
    return Boolean(control?.invalid && (control?.dirty || control?.touched || this.submitted));
  }

  
  nextStep() {
    if (this.stepFormValid()) {
      this.step++;
    } else {
      this.markCurrentStepFieldsTouched();
    }
  }

  previousStep() {
    if (this.step > 0) this.step--;
  }
  ngOnInit(): void {
    
  }

  stepFormValid(): boolean {
    const controls = Object.keys(this.vendorForm.controls);
    const requiredFields = this.getFieldsForStep(this.step);
    return requiredFields.every((field) => !this.vendorForm.get(field)?.invalid);
  }

  markCurrentStepFieldsTouched() {
    const requiredFields = this.getFieldsForStep(this.step);
    requiredFields.forEach((field) => this.vendorForm.get(field)?.markAsTouched());
  }

  getFieldsForStep(step: number): string[] {
    const stepMap: { [key: number]: string[] } = {
      0: ['vendor_name', 'email', 'mobile', 'password'],
      1: ['hotel_name', 'hotel_type', 'total_rooms'],
      2: ['city', 'state', 'pincode', 'price']
    };
    return stepMap[step] || [];
  }

  onImageChange(event: any) {
    this.images = Array.from(event.target.files);
  }

  onSubmit() {
    this.submitted = true;
    if (this.vendorForm.valid) {
      const data = { ...this.vendorForm.value, images: this.images };
      console.log('Form submitted:', data);
      // Send to backend API
    } else {
      this.markCurrentStepFieldsTouched();
    }
  }
}
