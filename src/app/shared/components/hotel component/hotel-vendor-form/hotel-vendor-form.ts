import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServices } from '../../../../core/services/user-services';
import {  Router } from '@angular/router';

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
  constructor(private fb: FormBuilder,private userService: UserServices,private router: Router) {
    this.vendorForm = this.fb.group({
      vendor_name: ['', Validators.required],
      vendor_email: ['', [Validators.required, Validators.email]],
      Mobilenumber: ['', Validators.required],
      vendor_password: ['', Validators.required],
      vendor_password_confirmation: ['', Validators.required],
      hotelname: ['', Validators.required],
      hoteltype: ['', Validators.required],
      totalrooms: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      baseprice: ['', Validators.required],
      address: ['', Validators.required],
      gstnumber: ['']
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
      0: ['vendor_name', 'vendor_email', 'Mobilenumber', 'vendor_password'],
      1: ['hotelname', 'hoteltype', 'totalrooms','vendor_password_confirmation'],
      2: ['city', 'state', 'pincode','address' ,'gstnumber']
    };
    return stepMap[step] || [];
  }

licenseFile: File | null = null;

onLicenseFileChange(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.licenseFile = file;
  }
}

  hotelImages: { file: File; preview: string }[] = [];

onImageChange(event: any): void {
  const files: FileList = event.target.files;

  if (files && files.length > 0) {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.hotelImages.push({ file, preview: e.target.result });
         this.updateImageFiles(); // ✅ Update image list
      };
      reader.readAsDataURL(file);
    });
  }
}
updateImageFiles() {
  this.images = this.hotelImages.map(img => img.file);
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
  console.log('Form submitted:', this.vendorForm.value);
  if (this.vendorForm.valid && this.licenseFile) {
    const formData = new FormData();

    // Append form fields
    Object.entries(this.vendorForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    // Append license file
    formData.append('licensefile', this.licenseFile);

    // Append multiple hotel images
    this.images.forEach((file, index) => {
      formData.append('hotel_images[]', file);  // 'images[]' matches backend expectation
    });

    console.log('Sending form data...');

    this.userService.registerHotelVendor(formData).subscribe((res: any) => {
      console.log('✅ Server response:', res);
      if (res.access_token) {
        sessionStorage.setItem('token', res.access_token);
        sessionStorage.setItem('name', res.vendor.vendor_name);
        sessionStorage.setItem('email', res.vendor.vendor_email);
        sessionStorage.setItem('role', 'hotel_vendor');
        this.router.navigate(['/deskboard']);
      }
      this.vendorForm.reset();
    });

  } else {
    console.error('Form is invalid or license file is missing');
    if (!this.licenseFile) {
      alert('License file is required');
    }
    this.markCurrentStepFieldsTouched();
  }
}

}
