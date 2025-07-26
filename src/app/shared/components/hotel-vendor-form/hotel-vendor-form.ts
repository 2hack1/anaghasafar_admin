import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-hotel-vendor-form',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './hotel-vendor-form.html',
  styleUrl: './hotel-vendor-form.scss'
})
export class HotelVendorForm  implements OnInit{
vendorForm: FormGroup;
  step = 0;
  steps = ['Vendor Info', 'Hotel Details', 'Location & Price', 'Uploads'];
  images: File[] = [];
  submitted = false;

  ngOnInit(): void {
    
  }
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
  // 

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

  // onImageChange(event: any) {
  //   this.images = Array.from(event.target.files);
  // }

  hotelImages: { file: File; preview: string }[] = [];

onImageChange(event: any): void {
  const files: FileList = event.target.files;

  if (files && files.length > 0) {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.hotelImages.push({ file, preview: e.target.result });
      };
      reader.readAsDataURL(file);
    });
  }
}

removeImage(index: number, imageInput: HTMLInputElement): void {
  this.hotelImages.splice(index, 1);

  // Rebuild FileList and reset input
  const dataTransfer = new DataTransfer();
  this.hotelImages.forEach(image => dataTransfer.items.add(image.file));
  imageInput.files = dataTransfer.files;
}

gstInvalid = false;

validateGST(event: any) {
  const gstValue = event.target.value.toUpperCase();
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
  this.gstInvalid = gstValue && !gstRegex.test(gstValue);
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
