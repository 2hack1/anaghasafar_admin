import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-hotel-teck',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './hotel-teck.html',
  styleUrl: './hotel-teck.scss'
})
export class HotelTeck  implements OnInit {
  roomForm!: FormGroup;

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
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
      checkInTime: [''],
      checkOutTime: [''],
      
    });

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

  onSubmit(): void {
  console.log('Is form valid?', this.roomForm.valid);
  console.log('Form values:', this.roomForm.value);

  if (this.roomForm.valid) {
    console.log('Form submitted successfully!');
  } else {
    this.roomForm.markAllAsTouched();
  }
}

}
