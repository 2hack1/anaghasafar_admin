import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { UserServices } from '../../../core/services/user-services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-packages',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './packages.html',
  styleUrl: './packages.scss'
})
export class Packages implements OnInit {

  currentStep = 1;
  maxSteps = 7;

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

  
  destinationId: any;
  destinationName: string = '';
  tourMonthId: number | null = null;

  sub_destinationId: any;


  modeSearch = '';
  dropdownOpen = true;

  transportOptions: string[] = ['Bus', 'Train', 'Flight', 'Car'];
  selectedModes: string[] = [];
  constructor(
    private fb: FormBuilder,
    private service: UserServices,
    private route: ActivatedRoute
  ) {

    this.packageForm = this.fb.group({
      package_code: ['', Validators.required],
      place_name: ['', Validators.required],
      price_trip: [null, Validators.required],
      duration_days: [null, Validators.required],
      origin: ['', Validators.required],
      departure_point: ['', Validators.required],
      about_trip: ['', Validators.required],
    });


    this.imageForm = this.fb.group({ image: [''] });

    this.itineraryForm = this.fb.group({
      day_wise_details: this.fb.array([]),
    });


    this.monthForm = this.fb.group({
      months: this.fb.array([] as FormGroup[])  // 👈 Explicitly type the array
    });

    this.transportForm = this.fb.group({
      mode: [[]], // multi-select values will be stored in an array
      details: [''],
    });


    this.dateForm = this.fb.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      availability: [true, Validators.required],
    });
  }

  ngOnInit(): void {
    this.destinationId = this.route.snapshot.paramMap.get('id');
    this.loadPackages();



  }


  selectMode(mode: string) {
    if (!this.selectedModes.includes(mode)) {
      this.selectedModes.push(mode);
      this.transportForm.patchValue({
        mode: this.selectedModes
      });
    }
  }

  removeMode(mode: string) {
    const index = this.selectedModes.indexOf(mode);
    if (index !== -1) {
      this.selectedModes.splice(index, 1);
      this.transportForm.patchValue({
        mode: this.selectedModes
      });
    }
  }
  // month2Array:any;
  get monthsArray(): FormArray {
    return this.monthForm.get('months') as FormArray;

  }


  getDateControls(monthGroup: any): FormGroup[] {
    return (monthGroup.get('dates') as FormArray).controls as FormGroup[];
  }




  addMonth() {
    this.monthsArray.push(
      this.fb.group({
        month: ['', Validators.required],
        year: ['', Validators.required],
        dates: this.fb.array([this.createDateGroup()])
      })
    );
  }

  createDateGroup(): FormGroup {
    return this.fb.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      availability: [true, Validators.required],
    });
  }

  addDate(monthIndex: number) {
    const dates = this.monthsArray.at(monthIndex).get('dates') as FormArray;
    dates.push(this.createDateGroup());
  }

  removeMonth(index: number) {
    this.monthsArray.removeAt(index);
  }

  removeDate(monthIndex: number, dateIndex: number) {
    const dates = this.monthsArray.at(monthIndex).get('dates') as FormArray;
    dates.removeAt(dateIndex);
  }

  loadPackages() {
    this.service.getAllPackages(this.destinationId).subscribe((res: any) => {
      this.allPackages = res;
      if (res.length > 0) {
        this.destinationName = res[0]?.sub_destination?.name || '';
      }
    });
  }


  loadparticularPackage(packageid: any) {
    this.service.getperticular(packageid).subscribe((res: any) => {
      this.allPackages = res;
      console.log("particular package id:", res)

      this.service.paticualarid=res[0].sub_destination_id;
      console.log("particuarlpackage",this.service.paticualarid);
      // va
      // vb
      // if (res.length > 0) {
      //   this.destinationName = res[0]?.sub_destination?.name || '';
      // 
      
    });
  }


  removeItinerary(index: number) {
    const itineraryArray = this.itineraryForm.get('day_wise_details') as FormArray;
    itineraryArray.removeAt(index);
  }
  addItinerary() {
    const itineraryArray = this.itineraryForm.get('day_wise_details') as FormArray;
    itineraryArray.push(this.fb.group({
      day: [''],
      title: [''],
      detail: [''],
      open: [true]
    }));
  }

  // ************************** start get punch the value to the form **************************************

  loadPackagesitinaries(packageid: any) {
    const itineraryArray = this.itineraryForm.get('day_wise_details') as FormArray;
    itineraryArray.clear();  // Clear old data

    this.service.getitineries(packageid).subscribe((res: any) => {
      const days = res[0]?.day_wise_details;
      console.log("itineraries: ", days);

      if (days) {
        Object.entries(days).forEach(([dayKey, detailValue]) => {
          itineraryArray.push(this.fb.group({
            day: [dayKey],
            title: [''],     // You can update this if API provides a title
            detail: [detailValue],
            open: [true]     // Defaulting open to true; adjust if needed
          }));
        });
      }
    });
  }

  loadPackagesimg(packageid: any) {
    this.service.getImage(packageid).subscribe((res: any) => {
      console.log("image:", res);
      if (res.length > 0 && res[0].img) {
        this.imageForm.patchValue({ image: res[0].img });
      }
    });
  }

  loadPackagesMonth(packageId: any) {

    console.log("packageId:", packageId)
    const months = this.monthForm.get('months') as FormArray;
    months.clear();

    this.service.getMonth(packageId).subscribe((res: any) => {
      console.log(" Response received from API:", res);

      res.forEach((monthItem: any, index: number) => {
        console.log(`📦 Month[${index}]:`, monthItem);

        const dateArray = this.fb.array<FormGroup>([]);

        if (!Array.isArray(monthItem.datestours)) {
          console.warn(`❌ datestours is not an array at index ${index}`);
        }

        (monthItem.datestours || []).forEach((date: any, dateIndex: number) => {
          console.log(`📅 Date[${index}][${dateIndex}] - Raw:`, date);

          const startDate = date.start_date;
          const endDate = date.end_date;
          const availability = date.availability;
          const tour_month_id = date.tour_month_id;
          if (!availability) {
            console.warn(`⚠️ Missing availability for date at Month[${index}], Date[${dateIndex}]`);
          }

          const dateGroup = this.fb.group({
            start_date: [startDate || null],
            end_date: [endDate || null],
            availability: [availability || 'open'],  // fallback if empty
            tour_month_id: [tour_month_id]
          });

          dateArray.push(dateGroup);
        });

        const monthGroup = this.fb.group({
          month: [monthItem.month || ''],
          year: [monthItem.year || ''],
          package_id: [monthItem.package_id || this.currentId],  // 👈 add this
          tour_month_id: [monthItem.tour_month_id || null],
          dates: dateArray
        });


        months.push(monthGroup);
      });

      console.log("✅ Final FormArray value:", months.value);
    });
  }

  loadPackagesTransport(packageid: any) {
    this.service.getTransportation(packageid).subscribe((res: any) => {
      if (res.length > 0) {
        const transport = res[0];

        // ✅ Convert object keys to array: { bus: "bus", train: "train" } -> ['bus', 'train']
        const selected = Object.keys(transport.mode || {});

        // ✅ Save selected modes to UI
        this.selectedModes = [...selected];

        // ✅ Patch to reactive form
        this.transportForm.patchValue({
          mode: this.selectedModes,
          details: transport.details
        });
      }
    });
  }

  // ************************** end get punch the value to the form **************************************

  showForm(edit = false, data?: any) {
    this.formVisible = true;
    this.currentStep = 1;
    this.isEditing = edit;
    this.selectedFile = null;
    this.resetForms();

    if (edit && data) {

      this.currentId = data.package_id;
      console.log("current ID:", this.currentId)

      this.packageForm.patchValue(data);
      this.loadparticularPackage(this.currentId);
      this.loadPackagesitinaries(this.currentId);
      this.loadPackagesMonth(this.currentId);
      this.loadPackagesTransport(this.currentId);
      this.loadPackagesimg(this.currentId);
    } else {

      this.currentId = null;
      this.packageForm.reset();
    }
  }

  resetForms() {
    this.packageForm.reset();
    this.imageForm.reset();
    this.itineraryForm.reset();
    this.monthForm.setControl('months', this.fb.array([]));
    this.transportForm.reset();
    this.dateForm.reset();
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    console.log("image", this.selectedFile)
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  a: any;
  saveStep() {
    console.log("Current step:", this.currentStep);

    switch (this.currentStep) {
      case 1:
        if (this.packageForm.invalid) return alert("Please fill all required fields.");
        console.log("Step 1 working");
        this.savePackageInfo();
        //  this.nextStep();  
        this.a = true;
        break;
      case 2:
        if (!this.selectedFile) return alert("Please upload an image.");
        console.log("Step 2 working");
        this.saveImage();

        // this.nextStep();
        break;
      case 3:
        if (this.itineraryForm.invalid) return alert("Please enter itinerary details.");
        console.log("Step 3 working");
        this.saveItinerary();
        break;
      case 4:
        if (!this.a) return alert("Please fill month and year.");
        console.log("Step 4 working");
        this.saveMonth();
        break;
      case 5:
        if (this.monthForm.invalid) return alert("Please enter transport details.");
        console.log("Step 5 working");
        this.saveDate();
        break;
      case 6:
        if (this.transportForm.invalid) return alert("Please enter transport details.");
        console.log("Step 6 working");
        this.saveTransports();
        // this.nextStep();
        break;
      case 7:
        if (!this.a) {
          alert("Please fill all date fields.");
          break;
        }
        console.log("Step 7 working");
        this.formVisible = false; // Close form after final step
        // this.savePackageInfo();
        // this.saveImage();
        // this.saveMonth();
        // this.saveDate();
        // this.saveTransport();
        // this.loadPackages();      // Refresh data
        break;
    }
  }



  nextStep() {
    if (this.currentStep < this.maxSteps) {
      this.currentStep++;
      console.log("Moved to step:", this.currentStep);
    }
  }

  // ******************************** save data in the db ***************************

  // savePackageInfo() {
  //   const formData = new FormData();
  //   Object.entries(this.packageForm.value).forEach(([key, value]) =>
  //     formData.append(key, value as any)
  // );

  // if (this.isEditing && this.currentId) {
  //   this.service.updatePackage(this.currentId, formData).subscribe({
  //     next: (res: any) => {
  //       this.currentId = res.package_id;
  //       this.nextStep();
  //       },
  //       error: (err) => {
  //         console.error('Error saving package info:', err);
  //         alert("Failed to save package info.");
  //       }
  //     });
  //   } else {
  //     formData.append('sub_destination_id', this.sub_destinationId);
  //     this.service.createPackage(formData, this.destinationId).subscribe({
  //       next: (res: any) => {
  //         console.log("create succussfullly:", res);
  //         this.currentId = res.package_id;
  //         this.loadPackages();
  //         this.nextStep();
  //       },
  //       error: (err) => {
  //         console.error('Error creating package:', err);
  //         alert("Failed to create package.");
  //       }
  //     });
  //   }
  // }

  savePackageInfo() {
    const formData = new FormData();
   


    // Append form data
    Object.entries(this.packageForm.value).forEach(([key, value]) =>
      formData.append(key, value as any),
      
    );
   if (this.currentId !== null) {
  formData.append('sub_destination_id',this.service.paticualarid.toString());
}
    // Check for edit mode
    if (this.isEditing && this.service.paticualarid) {
      console.log("particular parckage:",this.currentId)
      this.service.updatePackage(this.service.paticualarid, formData).subscribe({
        next: (res: any) => {
          this.currentId = res.package_id; // Update currentId from response
          this.nextStep();
        },
        error: (err) => {
          console.error('Error updating package info:', err);
          alert("Failed to update package info.");
        }
      });
    } else {
      // New package creation
      
      formData.append('sub_destination_id', this.sub_destinationId);
      this.service.createPackage(formData, this.destinationId).subscribe({
        next: (res: any) => {
          console.log("Created successfully:", res);
          this.currentId = res.package_id;
          this.loadPackages(); // Refresh list
          this.nextStep();
        },
        error: (err) => {
          console.error('Error creating package:', err);
          alert("Failed to create package.");
        }
      });
    }
  }




  //   saveImage() {
  //     console.log("🟡 saveImage() called");

  //     // Check if file is selected
  //     if (!this.selectedFile) {
  //       console.warn("⚠️ No file selected.");
  //       return;
  //     }

  //   // Check if currentId is available
  //   if (!this.currentId) {
  //     alert("Package ID is missing. Cannot upload image.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('image', this.selectedFile);
  //   formData.append('pac_img_path', "pacimg");

  //   this.service.uploadPackageImage(formData, this.currentId).subscribe({
  //     next: (res) => {
  //       this.nextStep();
  //     },
  //     error: (err) => {
  //       alert("Image upload failed. Please try again.");
  //     }
  //   });
  // }

  saveImage() {
    console.log("🟡 saveImage() called");

    if (!this.selectedFile) {
      console.warn("⚠️ No file selected.");
      return;
    }

    if (!this.currentId) {
      alert("Package ID is missing. Cannot upload image.");
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('pac_img_path', 'pacimg');

    if (this.isEditing) {
      // Update API – send image update request
      this.service.updatePackageImage(this.currentId, formData).subscribe({
        next: (res) => {
          console.log("✅ Image updated:", res);
          this.nextStep();
        },
        error: (err) => {
          console.error("❌ Image update failed:", err);
          alert("Failed to update image.");
        }
      });
    } else {
      // Create API – send image upload request
      this.service.uploadPackageImage(formData, this.currentId).subscribe({
        next: (res) => {
          console.log("✅ Image uploaded:", res);
          this.nextStep();
        },
        error: (err) => {
          console.error("❌ Image upload failed:", err);
          alert("Failed to upload image.");
        }
      });
    }
  }




  //   saveItinerary() {
  //     if (!this.currentId) return;
  //     const body = {
  //       day_wise_details: this.itineraryForm.value.day_wise_details,
  //     };
  //     this.service.saveItinerary(body, this.currentId).subscribe({
  //       next: (res) => {
  //       this.nextStep();
  //     },
  //     error: (err) => {
  //       alert("saveItinerary upload failed. Please try again.");
  //     }
  //   });
  // }
  saveItinerary() {
    if (!this.currentId) {
      alert("Package ID is missing. Cannot save itinerary.");
      return;
    }

    const body = {
      day_wise_details: this.itineraryForm.value.day_wise_details,
    };

    if (this.isEditing) {
      // Call update itinerary API
      this.service.updateItinerary(this.currentId, body).subscribe({
        next: (res: any) => {
          console.log("✅ Itinerary updated:", res);
          this.nextStep();
        },
        error: (err: any) => {
          console.error("❌ Failed to update itinerary:", err);
          alert("Failed to update itinerary.");
        }
      });
    } else {
      // Call create itinerary API
      this.service.saveItinerary(body, this.currentId).subscribe({
        next: (res) => {
          console.log("✅ Itinerary created:", res);
          this.nextStep();
        },
        error: (err) => {
          console.error("❌ Failed to create itinerary:", err);
          alert("Failed to create itinerary.");
        }
      });
    }
  }



  get dayWiseControls() {
    return (this.itineraryForm.get('day_wise_details') as FormArray).controls;
  }

  //   saveMonth() {
  //     if (!this.currentId) return;

  //   const monthList = this.monthsArray.value;
  //   const moList = monthList.map((item: any) => ({
  //     package_id: this.currentId,
  //     month: item.month,
  //     year: item.year
  //   }));

  //   this.service.saveMonthTour(moList).subscribe((res: any) => {
  //     console.log("📦 Saved months:", res);

  //     this.loadPackagesMonth(this.currentId);
  //     this.nextStep();
  //   });
  // }
  saveMonth() {
    if (!this.currentId) {
      alert("Package ID is missing. Cannot save months.");
      return;
    }

    const monthList = this.monthsArray.value;

    const moList = monthList.map((item: any) => ({
      package_id: this.currentId,
      month: item.month,
      year: item.year
    }));

    if (this.isEditing) {
      // Update month tour records
      this.service.updateMonthTour(this.currentId, moList).subscribe({
        next: (res: any) => {
          console.log("✅ Month tours updated:", res);
          this.loadPackagesMonth(this.currentId);
          this.nextStep();
        },
        error: (err: any) => {
          console.error("❌ Failed to update month tours:", err);
          alert("Failed to update month tours.");
        }
      });
    } else {
      // Create month tour records
      this.service.saveMonthTour(moList).subscribe({
        next: (res: any) => {
          console.log("📦 Saved months:", res);
          this.loadPackagesMonth(this.currentId);
          this.nextStep();
        },
        error: (err) => {
          console.error("❌ Failed to save month tours:", err);
          alert("Failed to save month tours.");
        }
      });
    }
  }


  // saveDate() {
  //   if (!this.currentId) return;

  //   const allDates: any[] = [];

  //   this.monthsArray.controls.forEach((monthCtrl, index) => {
  //     const datesArray = (monthCtrl.get('dates') as FormArray).value || [];
  //     const tourMonthId = monthCtrl.get('tour_month_id')?.value;

  //     datesArray.forEach((date: any) => {
  //       if (date.start_date && date.end_date && date.availability) {
  //         allDates.push({
  //           start_date: date.start_date,
  //           end_date: date.end_date,
  //           availability: date.availability,
  //           tour_month_id: tourMonthId
  //         });
  //       }
  //     });
  //   });


  //   if (allDates.length === 0) {
  //     alert("No valid dates to save.");
  //     return;
  //   }

  //   this.service.saveDateTour( allDates).subscribe(() => {
  //     this.nextStep();
  //   });
  // }
  saveDate() {
    if (!this.currentId) return;

    const allDates: any[] = [];

    this.monthsArray.controls.forEach((monthCtrl) => {
      const datesArray = (monthCtrl.get('dates') as FormArray).value || [];
      const tourMonthId = monthCtrl.get('tour_month_id')?.value;

      datesArray.forEach((date: any) => {
        if (date.start_date && date.end_date && date.availability) {
          allDates.push({
            start_date: date.start_date,
            end_date: date.end_date,
            availability: date.availability,
            tour_month_id: tourMonthId,
          });
        }
      });
    });

    if (allDates.length === 0) {
      alert("No valid dates to save.");
      return;
    }

    if (this.isEditing) {
      this.service.updateDateTour(allDates).subscribe({
        next: () =>
          this.nextStep(),
        error: (err: any) => {
          console.error("❌ Error updating dates:", err);
          alert("Failed to update date tours.");
        }
      });
    } else {
      this.service.saveDateTour(allDates).subscribe({
        next: () => this.nextStep(),
        error: (err) => {
          console.error("❌ Error saving dates:", err);
          alert("Failed to save date tours.");
        }
      });
    }
  }


  // saveTransports() {
  //   if (!this.currentId) return;
  //   const modeControl = this.transportForm.get('mode')?.value;
  //   const modeArray = Array.isArray(modeControl)
  //     ? modeControl
  //     : (typeof modeControl === 'string' ? modeControl.split(',').map(m => m.trim()) : []);

  //     const body = {
  //       ...this.transportForm.value,
  //       mode: modeArray, // send as array
  //     };

  //     this.service.saveTransport(body, this.currentId).subscribe({
  //       next: (res) => {
  //         console.log("✅ Transport saved:", res);
  //         this.nextStep();
  //       },
  //       error: (err) => {
  //         console.error("❌ Transport save failed:", err);
  //         alert("saveTransports upload failed. Please try again.");
  //       }
  //     });
  //   }
  saveTransports() {
    if (!this.currentId) return;

    const modeControl = this.transportForm.get('mode')?.value;
    const modeArray = Array.isArray(modeControl)
      ? modeControl
      : (typeof modeControl === 'string'
        ? modeControl.split(',').map(m => m.trim())
        : []);

    const body = {
      ...this.transportForm.value,
      mode: modeArray,
    };

    if (this.isEditing) {
      this.service.updateTransport(body, this.currentId).subscribe({
        next: () => {
          // console.log("✅ Transport updated:", res);
          this.nextStep();
        },
        error: (err: any) => {
          console.error("❌ Transport update failed:", err);
          alert("Update transport failed. Please try again.");
        }
      });
    } else {
      this.service.saveTransport(body, this.currentId).subscribe({
        next: (res) => {
          console.log("✅ Transport saved:", res);
          this.nextStep();
        },
        error: (err) => {
          console.error("❌ Transport save failed:", err);
          alert("Save transport failed. Please try again.");
        }
      });
    }
  }


  // ******************************** emd data in the db ***************************

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
  }
}