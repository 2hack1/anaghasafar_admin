import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';


@Component({
  selector: 'app-add-rooms',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-rooms.html',
  styleUrl: './add-rooms.scss'
})
export class AddRooms {
  images: File[] = [];
  roomForm!: FormGroup;
  showcancellation: boolean = false;
  formErrors: string[] = [];
  roomTypes = ['Deluxe King Room', 'Superior Twin Room', 'Executive Suite', 'Family Room – Ocean View'];
  bedTypes = ['Single', 'Double', 'King', 'Twin'];
  bookingStatuses = ['Available', 'Booked', 'Under Maintenance'];
  amenitiesList = [
    'AC / Non-AC', 'Wi-Fi', 'TV', 'Room Service', 'Attached Bathroom',
    'Mini Bar', 'Safe Locker', 'Work Desk', 'Balcony', 'Smoking Allowed', 'Pets Allowed'
  ];

  tagCtrl = new FormControl('');
  allTags: string[] = ['Mountain View', 'Sea Facing', 'Private Balcony', 'Free WiFi', 'Air Conditioning', 'Mini Bar'];
  filteredTags!: Observable<string[]>;
  selectedTags: string[] = [];

  constructor(private fb: FormBuilder) {
    this.roomForm = this.fb.group({

      roomType: ['', Validators.required],
      numRooms: [1, [Validators.required, Validators.min(1)]],
      basePrice: [0, [Validators.required, Validators.min(0)]],
      discount: [0],
      finalPrice: [0],
      extraBedCharge: [0],
      taxIncluded: [false],
      maxAdults: [1, Validators.required],
      maxChildren: [0],
      numberOfBeds: [1, Validators.required],
      bedType: ['', Validators.required],
      roomImages: [null],
      amenities: this.fb.array([]),
      bookingStatus: ['', Validators.required],
      visibility: [true],
      description: [''],
      cancellationPolicy: [''],
      cancellation: [false],
      cancellation_charges: [0],
      checkInTime: [''],
      checkOutTime: [''],

    });
  }

  ngOnInit(): void {


    this.roomForm.get('cancellation')?.valueChanges.subscribe((value: boolean) => {
      this.showcancellation = value;
    });



    if (this.roomForm.valid) {
      console.log('Form submitted successfully!');
    } else {
      this.roomForm.markAllAsTouched(); // ✅ This ensures touched state = true
    }

    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice())
    );

    this.roomForm.get('basePrice')?.valueChanges.subscribe(() => this.updateFinalPrice());
    this.roomForm.get('discount')?.valueChanges.subscribe(() => this.updateFinalPrice());
  }

  get amenities(): FormArray {
    return this.roomForm.get('amenities') as FormArray;
  }

  onAmenityChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    if (checkbox.checked) {
      this.amenities.push(this.fb.control(value));
    } else {
      const index = this.amenities.controls.findIndex(x => x.value === value);
      if (index >= 0) {
        this.amenities.removeAt(index);
      }
    }
  }

  updateFinalPrice(): void {
    const base = this.roomForm.get('basePrice')?.value || 0;
    const discount = this.roomForm.get('discount')?.value || 0;
    const final = base - (base * (discount / 100));
    this.roomForm.patchValue({ finalPrice: final }, { emitEvent: false });
  }

  removeTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
      this.updateTagsFormValue();
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(tag =>
      tag.toLowerCase().includes(filterValue) && !this.selectedTags.includes(tag)
    );
  }

  private updateTagsFormValue(): void {
    this.roomForm.get('tags')?.setValue(this.selectedTags.join(', '));
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



  onSubmit(): void {
    this.formErrors = []; // clear old errors

    if (this.roomForm.valid) {
      const formData = new FormData();



      this.images.forEach((file, index) => {
        formData.append('rooms_image[]', file);  // 'images[]' matches backend expectation

      });

      this.amenities.controls.forEach(control => {
        formData.append('amenities[]', control.value);
      });


      formData.append('roomType', this.roomForm.get('roomType')?.value || '');
      formData.append('numRooms', this.roomForm.get('numRooms')?.value.toString() || '1');
      formData.append('basePrice', this.roomForm.get('basePrice')?.value.toString() || '0');
      formData.append('discount', this.roomForm.get('discount')?.value.toString() || '0');
      formData.append('finalPrice', this.roomForm.get('finalPrice')?.value.toString() || '0');
      formData.append('extraBedCharge', this.roomForm.get('extraBedCharge')?.value.toString() || '0');
      formData.append('taxIncluded', this.roomForm.get('taxIncluded')?.value ? 'true' : 'false');
      formData.append('maxAdults', this.roomForm.get('maxAdults')?.value.toString() || '1');
      formData.append('maxChildren', this.roomForm.get('maxChildren')?.value.toString() || '0');
      formData.append('numberOfBeds', this.roomForm.get('numberOfBeds')?.value.toString() || '1');
      formData.append('bedType', this.roomForm.get('bedType')?.value || '');
      formData.append('bookingStatus', this.roomForm.get('bookingStatus')?.value || '');
      formData.append('visibility', this.roomForm.get('visibility')?.value ? 'true' : 'false');
      formData.append('description', this.roomForm.get('description')?.value || '');
      formData.append('cancellationPolicy', this.roomForm.get('cancellationPolicy')?.value || '');
      formData.append('cancellation_charges', this.roomForm.get('cancellation_charges')?.value.toString() || '0');
      formData.append('checkInTime', this.roomForm.get('checkInTime')?.value || '');
      formData.append('checkOutTime', this.roomForm.get('checkOutTime')?.value || '');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
    } else {
      this.roomForm.markAllAsTouched();

      // Collect all validation errors
      for (const controlName in this.roomForm.controls) {
        const control = this.roomForm.get(controlName);
        if (control && control.errors) {
          if (control.errors['required']) {
            this.formErrors.push(`${this.getFieldLabel(controlName)} is required.`);
          }
          if (control.errors['min']) {
            this.formErrors.push(`${this.getFieldLabel(controlName)} must be at least ${control.errors['min'].min}.`);
          }
        }
      }
    }
  }


  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      roomType: 'Room Type',
      numRooms: 'Number of Rooms',
      basePrice: 'Base Price',
      discount: 'Discount',
      finalPrice: 'Final Price',
      extraBedCharge: 'Extra Bed Charge',
      taxIncluded: 'Tax Included',
      maxAdults: 'Max Adults',
      maxChildren: 'Max Children',
      numberOfBeds: 'Number of Beds',
      bedType: 'Bed Type',
      bookingStatus: 'Booking Status',
      visibility: 'Visibility',
      description: 'Description',
      cancellation: 'Cancellation',
      cancellation_charges: 'Cancellation Charges',
      checkInTime: 'Check-In Time',
      checkOutTime: 'Check-Out Time'
    };
    return labels[fieldName] || fieldName;
  }







}
