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
  currentStep = 1;
  maxSteps = 6;

  packageForm: FormGroup;
  imageForm: FormGroup;
  itineraryForm: FormGroup;
  monthForm: FormGroup;
  transportForm: FormGroup;
  dateForm: FormGroup;

  formVisible = false;
  isEditing = false;
  selectedFile: File | null = null;
  allPackages: any[] = [];
  searchText = '';
  currentId: number | null = null;
  sub_destinationId: any;
  destinationName: string = '';
  tourMonthId: number | null = null;

  constructor(private fb: FormBuilder, private service: UserServices, private route: ActivatedRoute) {
    this.packageForm = this.fb.group({
      package_code: ['', Validators.required],
      place_name: ['', Validators.required],
      price_trip: [null, Validators.required],
      duration_days: [null, Validators.required],
      origin: ['', Validators.required],
      departure_point: ['', Validators.required],
      about_trip: ['', Validators.required],
    });

    this.imageForm = this.fb.group({ image: [null] });

    this.itineraryForm = this.fb.group({
      day_wise_details: [[], Validators.required],
    });

    this.monthForm = this.fb.group({
      month: ['', Validators.required],
      year: ['', Validators.required],
    });

    this.transportForm = this.fb.group({
      mode: [[], Validators.required],
      details: ['', Validators.required],
    });

    this.dateForm = this.fb.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      availability: [true, Validators.required],
    });
  }

  ngOnInit(): void {
    this.sub_destinationId = this.route.snapshot.paramMap.get('id');
    this.loadPackages();
  }
  
  loadPackages() {
    this.service.getAllPackages(this.sub_destinationId).subscribe((res: any) => {
      this.allPackages = res;
      console.log(res);
      if (res.length > 0) {
        this.destinationName = res[0]?.sub_destination?.name || '';
      }
    });
  }

  loadPackagesMonth(packageid: any) {
    this.service.getMonth(packageid).subscribe((res: any) => {
      this.allPackages = res;
      console.log(res);
      if (res.length > 0) {
        console.log("data not get");
      }
    });
  }
  loadPackagesDate() {
    this.service.getAllPackages(this.sub_destinationId).subscribe((res: any) => {
      this.allPackages = res;
      console.log(res);
      if (res.length > 0) {
        console.log("data not get");
      }
    });
  }
  loadPackagesTransport(packageid: any) {
    this.service.getTransportation(packageid).subscribe((res: any) => {
      this.allPackages = res;
      console.log(res);
      if (res.length > 0) {
        console.log("data not get");
      }
    });
  }
  loadPackagesimg(packageid: any) {
    this.service.getImage(packageid).subscribe((res: any) => {
      this.allPackages = res;
      console.log(res);
      if (res.length > 0) {
        console.log("data not get");
      }
    });
  }
  loadPackagesitinaries(packageid: any) {
    this.service.getitineries(packageid).subscribe((res: any) => {
      this.allPackages = res;
      console.log(res);
      if (res.length > 0) {
        console.log("data not get");
      }
    });
  }


  showForm(edit = false, data?: any) {
    this.formVisible = true;
    this.currentStep = 1;
    this.isEditing = edit;
    this.selectedFile = null;
    this.resetForms();

    if (edit && data) {
      this.loadPackagesitinaries(this.currentId);
      this.loadPackagesMonth(this.currentId);
      this.loadPackagesTransport(this.currentId);
      this.loadPackagesimg(this.currentId);
      this.currentId = data.package_id;
      
      // this.imageForm.patchValue()
      this.packageForm.patchValue(data);
    } else {
      this.currentId = null;
      this.packageForm.reset();
    }
  }

  resetForms() {
    this.packageForm.reset();
    this.imageForm.reset();
    this.itineraryForm.reset();
    this.monthForm.reset();
    this.transportForm.reset();
    this.dateForm.reset();
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }


  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  saveStep() {
    console.log("Current step:", this.currentStep);

    switch (this.currentStep) {
      case 1:
        if (this.packageForm.invalid) return alert("Please fill all required fields.");
        console.log("Step 1 working");
        this.savePackageInfo();
        this.nextStep();  // <-- ADD THIS
        break;
      case 2:
        if (!this.selectedFile) return alert("Please upload an image.");
        console.log("Step 2 working");
        //  this.saveImage();
        this.nextStep();  // <-- ADD THIS
        break;
      case 3:
        if (this.itineraryForm.invalid) return alert("Please enter itinerary details.");
        console.log("Step 3 working");
        this.nextStep();  // <-- ADD THIS
        break;
      case 4:
        if (this.monthForm.invalid) return alert("Please fill month and year.");
        console.log("Step 4 working");
        this.nextStep();  // <-- ADD THIS
        break;
      case 5:
        if (this.transportForm.invalid) return alert("Please enter transport details.");
        console.log("Step 5 working");
        this.nextStep();  // <-- ADD THIS
        break;
      case 6:
        if (this.dateForm.invalid) return alert("Please fill all date fields.");
        console.log("Step 6 working");
        this.formVisible = false; // Close form after final step
        this.loadPackages();      // Refresh data
        break;
    }
  }

  savePackageInfo() {
    const formData = new FormData();
    Object.entries(this.packageForm.value).forEach(([key, value]) =>
      formData.append(key, value as any)
    );

    if (this.isEditing && this.currentId) {
      this.service.updatePackage(this.currentId, formData).subscribe({
        next: (res: any) => {
          this.currentId = res.package_id;
          this.loadPackages();
          this.nextStep();
        },
        error: (err) => {
          console.error('Error saving package info:', err);
          alert("Failed to save package info.");
        }
      });
    } else {
      formData.append('sub_destination_id', this.sub_destinationId);
      this.service.createPackage(formData,1).subscribe({
        next: (res: any) => {
          this.currentId = res.package_id;
          this.loadPackages();
          this.nextStep();
        },
        error: (err) => {
          console.error('Error creating package:', err);
          alert("Failed to create package.");
        }
      });
    }
  }
  
  nextStep() {
    if (this.currentStep < this.maxSteps) {
      this.currentStep++;
      console.log("Moved to step:", this.currentStep);
    }
  }
  saveImage() {
    if (!this.selectedFile || !this.currentId) return;
    const formData = new FormData();
    formData.append('img', this.selectedFile);
    formData.append('package_id', this.currentId.toString());

    this.service.uploadPackageImage(formData,1).subscribe(() => {
      this.nextStep();
    });
  }

  saveItinerary() {
    if (!this.currentId) return;
    const body = {
      day_wise_details: this.itineraryForm.value.day_wise_details,
      package_id: this.currentId,
    };
    this.service.saveItinerary(body,1).subscribe(() => {
      this.nextStep();
    });
  }

  saveMonth() {
    if (!this.currentId) return;
    const body = {
      ...this.monthForm.value,
      package_id: this.currentId,
    };
    this.service.saveDateTour({body}).subscribe((res: any) => {
      this.tourMonthId = res.tour_month_id;
      this.nextStep();
    });
  }

  saveTransport() {
    if (!this.currentId) return;
    const body = {
      ...this.transportForm.value,
      package_id: this.currentId,
    };
    this.service.saveTransport(body,1).subscribe(() => {
      this.nextStep();
    });
  }

  saveDate() {
    if (!this.tourMonthId) return;
    const body = {
      ...this.dateForm.value,
      tour_month_id: this.tourMonthId,
    };
    this.service.saveDateTour(body).subscribe(() => {
      this.formVisible = false;
      this.loadPackages();
    });
  }

  deletePackage(id: number) {
    if (confirm('Are you sure to delete this package?')) {
      this.service.deletePackage(id).subscribe(() => {
        this.loadPackages();
      });
    }
  }

  get filteredPackages() {
    return this.allPackages.filter((p) =>
      p.place_name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }}
