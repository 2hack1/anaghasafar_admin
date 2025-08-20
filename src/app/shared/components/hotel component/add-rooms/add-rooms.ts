import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { UserServices } from '../../../../core/services/user-services';
import { NotifierContainerComponent, NotifierModule, NotifierService } from 'angular-notifier';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';



@Component({
  selector: 'app-add-rooms',
  imports: [CommonModule, ReactiveFormsModule,NotifierModule],
  templateUrl: './add-rooms.html',
  styleUrl: './add-rooms.scss'
})
export class AddRooms {
  images: File[] = [];
  roomForm!: FormGroup;
  showcancellation: boolean = true;
  // formErrors: string[] = [];
  

//   Single Room – For one person, usually one single bed.

// Double Room – For two people, one double bed or two twin beds.

// Twin Room – Two separate single beds.

// Triple Room – For three guests, with three beds or one double + one single.

// Queen Room – One queen-sized bed.

// King Room – One king-sized bed.

// Suite – Large, separate living area + bedroom; often more luxurious.


  roomTypes = [' Single', 'Double', 'Suite'];
  bedTypes = ['Single', 'Double', 'King', 'Twin'];
  bookingStatuses = ['Available', 'Booked', 'Under Maintenance'];
  amenitiesList = [
    'AC / Non-AC', 'Free Wi-Fi', 'TV', 'Room Service', 'Attached Bathroom',
    'Mini Bar', 'Safe Locker', 'Work Desk', 'Balcony', 'Smoking Allowed', 'Pets Allowed',
    'Swimming Pool','Caretaker','Housekeeping','Elevator/Lift','Washing Machine','Kitchenette','Paid Public Parking','Paid Public Parkin',
       ];
  
  tagCtrl = new FormControl('');
  allTags: string[] = ['Mountain View', 'Sea Facing', 'Private Balcony', 'Free WiFi', 'Air Conditioning', 'Mini Bar'];
  filteredTags!: Observable<string[]>;
  selectedTags: string[] = [];
  editalldata:any;

  editMode: boolean = false;
roomId: string | null = null;

  constructor(private fb: FormBuilder, private service: UserServices,private readonly notifier: NotifierService,private route:Router,private activate:ActivatedRoute) {
    this.roomForm = this.fb.group({

      roomType: ['', Validators.required],
      numRooms: [1, [Validators.required, Validators.min(1)]],
      basePrice: [0, [Validators.required, Validators.min(0)]],
      discount: [0],
      finalPrice: [0],
      extraBedCharge: [0],
      taxIncluded: [true],
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
      cancellation: [true],
      cancellation_charges: [0],
      checkInTime: [''],
      checkOutTime: [''],

    });
  }

ngOnInit(): void {
  this.roomId = this.activate.snapshot.paramMap.get('id');
  this.editMode = !!this.roomId;
 const apiImagePath='http://localhost:8000/storage/';
  if (this.editMode) {
    //  this.showcancellation=true;
    //  console.log(this.showcancellation)
    this.service.gethotelroom(this.roomId).subscribe((res: any) => {
      const data = res.data;

      // Patch form values (you're already doing this)
      this.roomForm.patchValue({ ...data });
      this.setAmenities(data.amenities);
      this.hotelImages = (data.rooms_image || []).map((img: string) => ({
        preview: apiImagePath + img,
        file: null,
        existing: true,
        name: img
      }));
      // this.showcancellation = data.cancellation === true;
      this.updateFinalPrice();
      this.updateImageFiles();
    });
  }

  this.roomForm.get('basePrice')?.valueChanges.subscribe(() => this.updateFinalPrice());
  this.roomForm.get('discount')?.valueChanges.subscribe(() => this.updateFinalPrice());
}

  get amenities(): FormArray {
    return this.roomForm.get('amenities') as FormArray;
  }

 chcek(){
   this.showcancellation=! this.showcancellation
 }

setAmenities(amenities: string[]) {
  const amenitiesArray = this.roomForm.get('amenities') as FormArray;
  amenitiesArray.clear();

  amenities.forEach((a: string) => {
    amenitiesArray.push(this.fb.control(a));
  });
}
updateImageFiles() {
  this.images = this.hotelImages
    .filter(img => img.file)        // only new uploads
    .map(img => img.file!);
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


  // hotelImages: { file: File; preview: string }[] = [];
hotelImages: { file: File | null; preview: string; existing?: boolean; name?: string }[] = [];


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

  removeImage(index: number): void {
  this.hotelImages.splice(index, 1);
  this.updateImageFiles();
}


  onSubmit(): void {
  if (this.roomForm.valid) {
    let formDat = new FormData();

    // ✅ Append new uploaded images only (File type)
    this.hotelImages
      .filter(img => img.file)
      .forEach((img, index) => {
        formDat.append('rooms_image[]', img.file!);
      });

    // ✅ Append names of existing images (kept in edit mode)
    this.hotelImages
      .filter(img => img.existing)
      .forEach((img) => {
        if (img.name) {
          formDat.append('existing_images[]', img.name);
        }
      });

    // ✅ Amenities
    this.amenities.controls.forEach(control => {
      formDat.append('amenities[]', control.value);
    });

    // ✅ Time formatting
    const checkInTime = this.roomForm.get('checkInTime')?.value;
    const checkOutTime = this.roomForm.get('checkOutTime')?.value;

    formDat.append('checkInTime', this.convertTo24HourFormat(checkInTime));
    formDat.append('checkOutTime', this.convertTo24HourFormat(checkOutTime));

    // ✅ Append all form fields
    formDat.append('roomType', this.roomForm.get('roomType')?.value || '');
    formDat.append('numRooms', this.roomForm.get('numRooms')?.value.toString() || '1');
    formDat.append('basePrice', this.roomForm.get('basePrice')?.value.toString() || '0');
    formDat.append('discount', this.roomForm.get('discount')?.value.toString() || '0');
    formDat.append('finalPrice', this.roomForm.get('finalPrice')?.value.toString() || '0');
    formDat.append('extraBedCharge', this.roomForm.get('extraBedCharge')?.value.toString() || '0');
    formDat.append('taxIncluded', this.roomForm.get('taxIncluded')?.value ? '1' : '0');
    formDat.append('maxAdults', this.roomForm.get('maxAdults')?.value.toString() || '1');
    formDat.append('maxChildren', this.roomForm.get('maxChildren')?.value.toString() || '0');
    formDat.append('numberOfBeds', this.roomForm.get('numberOfBeds')?.value.toString() || '1');
    formDat.append('bedType', this.roomForm.get('bedType')?.value || '');
    formDat.append('bookingStatus', this.roomForm.get('bookingStatus')?.value || '');
    formDat.append('visibility', this.roomForm.get('visibility')?.value ? '1' : '0');
    formDat.append('description', this.roomForm.get('description')?.value || '');
    formDat.append('cancellationPolicy', this.roomForm.get('cancellationPolicy')?.value || '');
    formDat.append('cancellation_charges', this.roomForm.get('cancellation_charges')?.value.toString() || '0');
    formDat.append('hotel_vendor_id', String(1211)); // Change if dynamic

    // Optional: log for debugging
    for (let [key, value] of formDat.entries()) {
      console.log(`${key}:`, value);
    }

    // ✅ Submit to backend
    this.service.addhotelrooms(formDat).subscribe((res: any) => {
      this.route.navigate(["deskboard/rooms"]);
    });
    
   
  } else {
    this.roomForm.markAllAsTouched();
    this.notifier.notify('error', 'All fields are required!');
  }
}


  



  convertTo24HourFormat(time: string): string {
    if (!time) return '';

    // If already in 24-hour (e.g., 14:00), return as is
    if (/^\d{2}:\d{2}$/.test(time)) return time;

    // Convert 12-hour time to 24-hour
    const [raw, modifier] = time.split(' ');
    let [hours, minutes] = raw.split(':').map(Number);

    if (modifier.toLowerCase() === 'pm' && hours < 12) hours += 12;
    if (modifier.toLowerCase() === 'am' && hours === 12) hours = 0;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

update(): void {
  if (this.roomForm.valid && this.roomId) {
    const formDat = new FormData();

    // Append existing image names
    this.hotelImages
      .filter(img => img.existing && img.name)
      .forEach(img => formDat.append('existing_images[]', img.name!));

      this.hotelImages
      .filter(img => img.file)
      .forEach((img, index) => {
        formDat.append('rooms_image[]', img.file!);
      });

  
    this.amenities.controls.forEach(control => {
      formDat.append('amenities[]', control.value);
    });

    const checkInTime = this.roomForm.get('checkInTime')?.value;
    const checkOutTime = this.roomForm.get('checkOutTime')?.value;

    formDat.append('roomType', this.roomForm.get('roomType')?.value || '');
    formDat.append('numRooms', this.roomForm.get('numRooms')?.value.toString());
    formDat.append('basePrice', this.roomForm.get('basePrice')?.value.toString());
    formDat.append('discount', this.roomForm.get('discount')?.value.toString());
    formDat.append('finalPrice', this.roomForm.get('finalPrice')?.value.toString());
    formDat.append('extraBedCharge', this.roomForm.get('extraBedCharge')?.value.toString());
    formDat.append('taxIncluded', this.roomForm.get('taxIncluded')?.value ? '1' : '0');
    formDat.append('maxAdults', this.roomForm.get('maxAdults')?.value.toString());
    formDat.append('maxChildren', this.roomForm.get('maxChildren')?.value.toString());
    formDat.append('numberOfBeds', this.roomForm.get('numberOfBeds')?.value.toString());
    formDat.append('bedType', this.roomForm.get('bedType')?.value);
    formDat.append('bookingStatus', this.roomForm.get('bookingStatus')?.value);
    formDat.append('visibility', this.roomForm.get('visibility')?.value ? '1' : '0');
    formDat.append('description', this.roomForm.get('description')?.value);
    formDat.append('cancellationPolicy', this.roomForm.get('cancellationPolicy')?.value);
    // formDat.append('cancellation_charges', this.roomForm.get('cancellation_charges')?.value.toString());
   const cancellationCharges = this.roomForm.get('cancellation_charges')?.value || 0;

formDat.append('cancellation_charges', cancellationCharges.toString());

// ✅ Set tab = true if charges are 0
// this.showcancellation = +cancellationCharges === 0;
    formDat.append('checkInTime', this.convertTo24HourFormat(checkInTime));
    formDat.append('checkOutTime', this.convertTo24HourFormat(checkOutTime));
    formDat.append('hotel_vendor_id', String(1211)); // Update if needed


    
    this.service.updateRoomData( formDat,this.roomId,).subscribe((res: any) => {
      this.service.norifilerrun=1;
      this.route.navigate(["deskboard/rooms"]);
      console.log("res for user side",res);
    });
    //  this.showcancellation=false;
  for (let [key, value] of formDat.entries()) {
      console.log("all data check",`${key}:`, value);
    }
    console.log("room id",this.roomId);

  } else {
    this.roomForm.markAllAsTouched();
    this.notifier.notify('error', 'All fields are required!');
  }
}


}
