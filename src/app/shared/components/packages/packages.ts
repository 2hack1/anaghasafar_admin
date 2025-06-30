import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { UserServices } from '../../../core/services/user-services';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-packages',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NotifierModule],
  templateUrl: './packages.html',
  styleUrl: './packages.scss'
})

export class Packages implements OnInit {

  currentStep = 1;
  maxSteps = 8;

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
  back = true;
  destinationId: any;
  destinationName: string = '';
  tourMonthId: number | null = null;
  sub_destinationId: any;
  modeSearch = '';
  dropdownOpen = true;
  transportOptions: string[] = ['Bus', 'Train', 'Flight', 'Car'];
  selectedModes: string[] = [];

  multimageForm: FormGroup;
  previewImages: any[] = [];
  imageFiles: File[] = [];
  uploadedImageUrls: string[] = [];

  newUploadedImages: any[] = []
  newUploadedIndex = 0;
  isRemoveImages = false;
  removedImages: any[] = []
  env = environment


  constructor(
    private fb: FormBuilder,
    private service: UserServices,
    private route: ActivatedRoute,
    private router: Router,
    private readonly notifier: NotifierService,


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


    //  this. multimageForm = this.fb.group({
    //   images: ['']
    // });
    this.multimageForm = this.fb.group({
      images: this.fb.array([]) // ✅ now it's a FormArray
    });
  }

  ngOnInit(): void {
    this.destinationId = this.route.snapshot.paramMap.get('id');
    this.service.subdestinationid = this.destinationId;
    this.loadPackages();
    //  this.toaseter.success('Hello world!', 'Toastr fun!');

  }
  // month2Array:any;
  get monthsArray(): FormArray {
    return this.monthForm.get('months') as FormArray;

  }

  onFileChangeMultiImage(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      Array.from(input.files).forEach(file => {
        this.imageFiles.push(file);
        this.newUploadedImages.push(file);

        const reader = new FileReader();
        reader.onload = (e: any) => this.previewImages.push({
          url: e.target.result,
          id: this.newUploadedIndex
        });

        this.newUploadedIndex++
        reader.readAsDataURL(file);
      });
    }
  }



  removeImage(index: number, id: any) {
    this.isRemoveImages = true
    this.removedImages.push(id);
    this.imageFiles.splice(index, 1);
    this.previewImages.splice(index, 1);

    // NEED EXTRA WORK
    // this.newUploadedImages.splice(index, 1)
    // console.log(this.newUploadedImages)
  }


  send(currentpacId: any) {
    //   console.log('Navigating to ID:', entry.sub_destination_id);
    if (currentpacId) {
      this.router.navigate(['/aboutTripOfPackage', currentpacId]);  // Cleaner and more reliable
    } else {
      console.warn('Invalid entry:', currentpacId);
    }
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
      this.service.subdestinationid = res[0].sub_destination_id;
      this.service.currentpackageId = res[0].package_id;
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
      // console.log("itineraries:", res);

      if (Array.isArray(days)) {
        days.forEach((item: any) => {
          itineraryArray.push(this.fb.group({
            day: [item.day],
            title: [item.title],
            detail: [item.detail],
            open: [item.open]
          }));
        });
      }
    });
  }
  get dayWiseControl() {
    return (this.itineraryForm.get('day_wise_details') as FormArray).controls;
  }

  // filename:any
  loadPackagesimg(packageid: any) {
    this.service.getImage(packageid).subscribe((res: any) => {
      // console.log("image:", res);
      if (res.length > 0 && res[0].img) {
        this.imageForm.patchValue({ image: res[0].img });

      }

    });
  }
  loadPackagesMonth(packageId: any) {
    // 
    // console.log("packageId:", packageId)
    const months = this.monthForm.get('months') as FormArray;
    months.clear();

    this.service.getMonth(packageId).subscribe((res: any) => {
      // console.log(" Response received from API:", res);

      res.forEach((monthItem: any, index: number) => {
        // console.log(`📦 Month[${index}]:`, monthItem);

        const dateArray = this.fb.array<FormGroup>([]);

        if (!Array.isArray(monthItem.datestours)) {
          // console.warn(`❌ datestours is not an array at index ${index}`);
        }

        (monthItem.datestours || []).forEach((date: any, dateIndex: number) => {
          // console.log(`📅 Date[${index}][${dateIndex}] - Raw:`, date);

          const startDate = date.start_date;
          const endDate = date.end_date;
          const availability = date.availability;
          const tour_month_id = date.tour_month_id;
          if (!availability) {
            // console.warn(`⚠️ Missing availability for date at Month[${index}], Date[${dateIndex}]`);
          }
          const dateGroup = this.fb.group({
            start_date: [startDate || null],
            end_date: [endDate || null],
            availability: [availability || 'open'],  // fallback if empty
            tour_month_id: [tour_month_id],
            date_id: [date.date_id || null],  // ✅ Add this line
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
    });
  }


  // currently checking mode**************************************
  loadmultimage(package_id: any) {

    this.service.loadimagereplaceGallary(package_id).subscribe({
      next: (res: any) => {
        const imageArray = this.multimageForm.get('images') as FormArray;
        imageArray.clear();

        const gallery = res?.data?.[0];
        if (gallery?.images?.length) {
          this.uploadedImageUrls = []; // reset preview if needed

          gallery.images.forEach((img: any) => {
            const d = {
              id: img.id,
              url: this.env.backendUrl + '/storage/' + img.url
            }
            imageArray.push(this.fb.group(d));

            // this.uploadedImageUrls.push(img.url); // to show in HTML preview
            this.previewImages.push(d); // 
          });
        }
      },
      error: (err) => console.error('Error loading images:', err)
    });
  }

  loadPackagesTransport(packageId: any) {

    if (!packageId) return;
    this.service.getTransportation(packageId).subscribe((res: any) => {
      if (res.length > 0) {
        const transport = res[0];
        this.transportForm.patchValue({
          mode: transport.mode?.[0] || '',      // ⬅️ Only first mode (single)
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
      this.back = true;
      this.currentId = data.package_id;
      // console.log("current ID:", this.currentId)

      this.packageForm.patchValue(data);
      this.loadparticularPackage(this.currentId);
      this.loadPackagesimg(this.currentId);
      this.loadPackagesitinaries(this.currentId);
      this.loadPackagesMonth(this.currentId);
      this.loadPackagesTransport(this.currentId);
      this.loadmultimage(this.currentId);
    } else {

      this.currentId = null;
      this.packageForm.reset();
      this.back = false;
    }
  }

  resetForms() {
    this.packageForm.reset();
    this.imageForm.reset();
    this.itineraryForm.reset();
    this.monthForm.setControl('months', this.fb.array([]));
    this.transportForm.reset();
    this.dateForm.reset();
    this.multimageForm.reset();
  }


  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    // console.log("image", this.selectedFile)
  }

  prevStep() {
    if (!this.back) {
      alert("you are not back to privious please save curent than edit ")
      return;
    }
    if (this.currentStep > 1) this.currentStep--;
  }

  closeForm() {
    this.formVisible = false;
    this.loadPackages();
  }
  a: any;
  saveStep() {
    // console.log("Current step:", this.currentStep);

    switch (this.currentStep) {
      case 1:
        if (this.packageForm.invalid) return alert("Please fill all required fields.");
        console.log("Step 1 working");
        this.savePackageInfo();
        //  this.nextStep();  
        this.a = true;
        break;
      case 2:
        if (!this.a) return alert("Please upload an image.");
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
        if (this.transportForm.invalid) return alert("Please enter transport details.");
        console.log("Step 6 working");
        this.submitImages();
        this.nextStep();
        break;
      case 8:
        if (!this.a) {
          alert("Please fill all date fields.");
          break;
        }
        console.log("Step 7 working");
        this.formVisible = false; // Close form after final step
        this.loadPackages();
        break;
    }
  }



  nextStep() {
    if (this.currentStep < this.maxSteps) {
      this.currentStep++;
      // console.log("Moved to step:", this.currentStep);
    }
  }

  // ******************************** save data in the db ***************************





  savePackageInfo() {
    const formData = new FormData();
    // Append form data
    Object.entries(this.packageForm.value).forEach(([key, value]) =>
      formData.append(key, value as any),
    );
    // Check for edit mode
    if (this.isEditing && this.service.subdestinationid) {
      if (this.service.subdestinationid !== null) {
        formData.append('sub_destination_id', this.service.subdestinationid);
      }
      // console.log("particular parckage:",this.currentId)
      this.currentId = parseInt(this.currentId as any);
      this.service.updatePackage(this.currentId, formData).subscribe({
        next: (res: any) => {
          this.currentId = res.package_id; // Update currentId from response
          this.notifier.notify('success', ' 1st Form Details Successfully Updated!');
          this.nextStep();
        },
        error: (err) => {
          // console.error('Error updating package info:', err);
          // alert("Failed to update package info.");
          this.notifier.notify('error', ' Somthing Wants wrong!');

        }

      });

    } else {
      // New package creation

      formData.append('sub_destination_id', this.sub_destinationId);
      this.service.createPackage(formData, this.destinationId).subscribe({
        next: (res: any) => {
          // console.log("Created successfully:", res);
          this.currentId = res.package_id;
          this.loadPackages(); // Refresh list
          this.notifier.notify('success', ' 1st Form Details Successfully Uploaded!');

          this.nextStep();
        },
        error: (err) => {
          // console.error('Error creating package:', err);
          // alert("Failed to create package.");
          this.notifier.notify('error', ' Somthing Wants wrong!');

        }

      });
    }
  }


  submitImages() {

    const formDat = new FormData();
    const removedFormData = new FormData();

    if (this.isEditing) {
      if (!this.service.currentpackageId) {
        alert("Package ID is missing. Cannot upload image.");
        return;
      }

      if (this.isRemoveImages) {
        this.removedImages.forEach(id => {
          formDat.append('deleted_images[]', id);
        })
      }

      this.newUploadedImages.forEach((file: any) => {
        formDat.append('images[]', file);
      });

      // this.previewImages.forEach(file => {
      //   // formDat.append('image[]', file); // ✅ Only actual File objects
      //   formDat.append('existing_images[]', file); // ✅ Only actual File objects
      // });

      for (const pair of formDat.entries()) {
        console.log(" that is image :", `${pair[0]}: `, pair[1]);
      }
      // this.previewImages = [];
      // this.uploadedImageUrls = [];

      this.service.imagereplaceGallary(formDat, this.service.currentpackageId).subscribe({
        next: (res) => {
          this.notifier.notify('success', 'Images successfully updated!');
          this.nextStep();
          this.previewImages = [];
          this.uploadedImageUrls = [];
          this.newUploadedImages = [];
        },
        error: (err) => {
          console.log(err)
          this.notifier.notify('error', 'Something went wrong during image update.');
        }
      });

    }
    else {
      if (!this.currentId) {
        alert("not have package id");
        return;
      }


      this.imageFiles.forEach(file => {
        formDat.append('image[]', file); // must match Laravel field
        formDat.append('img_path', "Packagegallery");
      });
      // Create API – send image upload request
      this.service.imageGallary(formDat, this.currentId).subscribe({
        next: (res) => {
          console.log("multi image", res);
          this.notifier.notify('success', ' 7st Form Details Successfully Upload!');
          this.nextStep();
        },
        error: (err) => {
          this.notifier.notify('error', ' Failed to upload image!......');
        }
      });
    }

    // if(!this.currentId){
    //   alert("Somthing wants worng")
    // }

    // console.log(this.service.currentpackageId);
    // console.log(this.service.subdestinationid);
    // console.log(this.currentId);
    // this.service.imageGallary(formDat,this.currentId).subscribe((res:any)=>{

    //   console.log("multi image",res);
    // })

    // Demo backend call - replace with your real API
    // this.http.post<any>('http://localhost:8000/api/upload-images', formData).subscribe({
    //   next: (response) => {
    //     this.uploadedImageUrls = response.images; // e.g., ["gallery/img1.jpg", "gallery/img2.jpg"]
    //     this.imageFiles = [];
    //     this.previewImages = [];
    //     alert('Images pushed successfully!');
    //   },
    //   error: () => {
    //     alert('Upload failed');
    //   }
    // });
  }

  saveImage() {
    if (!this.selectedFile) {
      // console.log("⚠️ No file selected.");
      this.nextStep();
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('pac_img_path', 'pacimg');

    if (this.isEditing) {

      if (!this.service.currentpackageId) {
        alert("Package ID is missing. Cannot upload image.");
        return;
      }
      // Update API – send image update request
      this.service.updatePackageImage(this.service.currentpackageId, formData).subscribe({
        next: (res) => {
          this.notifier.notify('success', ' 2st Form Details Successfully Updated!');
          this.nextStep();
        },
        error: (err) => {
          // alert("Failed to update image.");
          this.notifier.notify('error', ' Somthing Wants wrong!| Please check this Form Data');
        }
      });
    } else {
      if (!this.currentId) {
        alert("not have package id");
        return;
      }
      // Create API – send image upload request
      this.service.uploadPackageImage(formData, this.currentId).subscribe({
        next: (res) => {
          // console.log("✅ Image uploaded:", res);
          this.notifier.notify('success', ' 3st Form Details Successfully Upload!');
          this.nextStep();
        },
        error: (err) => {
          // console.error("❌ Image upload failed:", err);
          // alert("Failed to upload image.");
          this.notifier.notify('error', ' Failed to upload image!......');
        }
      });
    }
  }





  saveItinerary() {
    const body = {
      day_wise_details: this.itineraryForm.value.day_wise_details,
    };

    if (this.isEditing) {
      this.service.updateItinerary(this.service.currentpackageId, body).subscribe({
        next: (res: any) => {
          console.log("✅ Itinerary updated:", res);
          this.notifier.notify('success', ' 4st Form Details Successfully Updated!');
          this.nextStep();
        },
        error: (err: any) => {
          this.notifier.notify('error', ' Failed to update itinerary !......');

        }
      });
    } else {
      if (!this.currentId) {
        alert("Package ID is missing. Cannot save itinerary.");
        return;
      }
      // Call create itinerary API
      this.service.saveItinerary(body, this.currentId).subscribe({
        next: (res) => {
          console.log("✅ Itinerary created:", res);
          this.notifier.notify('success', ' 4st Form Details Successfully Upload!');
          this.nextStep();
        },
        error: (err) => {

          this.notifier.notify('error', ' Failed to Upload itinerary !......');

        }
      });
    }
  }
  get dayWiseControls() {
    return (this.itineraryForm.get('day_wise_details') as FormArray).controls;
  }


  saveMonth() {

    const monthList = this.monthsArray.value;

    // tour_month_id
    if (this.isEditing) {
      const moList = monthList.map((item: any) => ({
        tour_month_id: item.tour_month_id,
        package_id: this.service.currentpackageId,
        month: item.month,
        year: item.year
      }));
      // Update month tour records
      this.service.updateMonthTour(moList).subscribe({
        next: (res: any) => {
          // console.log("✅ Month tours updated:", res);
          this.loadPackagesMonth(this.service.currentpackageId);
          this.notifier.notify('success', '  Form Details Successfully Updated!');
          this.nextStep();
        },
        error: (err: any) => {

          this.notifier.notify('error', ' Failed to update month tours.!......');
        }
      });
    } else {
      const moList = monthList.map((item: any) => ({
        package_id: this.currentId,
        month: item.month,
        year: item.year
      }));
      if (!this.currentId) {
        alert("Package ID is missing. Cannot save months.");
        return;
      }
      // Create month tour records
      this.service.saveMonthTour(moList).subscribe({
        next: (res: any) => {
          console.log("📦 Saved months:", res);
          this.loadPackagesMonth(this.currentId);
          this.notifier.notify('success', ' Form Details Successfully Upload!');
          this.nextStep();
        },
        error: (err) => {

          this.notifier.notify('error', 'Failed to save month of tours.!......');
        }
      });
    }
  }

  saveDate() {
    // if (!this.currentId) return;
    const allDates: any[] = [];

    this.monthsArray.controls.forEach((monthCtrl) => {
      const datesArray = (monthCtrl.get('dates') as FormArray).value || [];
      const tourMonthId = monthCtrl.get('tour_month_id')?.value;

      datesArray.forEach((date: any) => {
        if (date.start_date && date.end_date && date.availability) {
          allDates.push({
            date_id: date.date_id,
            start_date: date.start_date,
            end_date: date.end_date,
            availability: date.availability,
            tour_month_id: tourMonthId,
          });
        }
      });
    });

    if (allDates.length === 0) {
      // if (!this.service.currentpackageId) return;
      alert("No valid dates to save.");
      return;
    }

    if (this.isEditing) {
      this.service.updateDateTour(allDates).subscribe({
        next: () => {
          this.notifier.notify('success', 'Form Details Successfully Updated!');
          this.nextStep()
        },
        error: (err: any) => {
          // console.error("❌ Error updating dates:", err);
          // alert("Failed to update date tours.");
          this.notifier.notify('error', 'Failed to update date of tours!......');

        }
      });
    } else {
      this.service.saveDateTour(allDates).subscribe({
        next: () => {

          this.notifier.notify('success', 'Form Details Successfully Upload!');
          this.nextStep()
        },
        error: (err) => {
          // console.error("❌ Error saving dates:", err);
          // alert("the end date must be ferther of start date");
          this.notifier.notify('error', 'the end date must be further of start date!......');
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

    const modeControl = this.transportForm.get('mode')?.value;
    const modeArray = Array.isArray(modeControl) ? modeControl : (typeof modeControl === 'string' ? modeControl.split(',').map(m => m.trim()) : []);

    const body = { ...this.transportForm.value, mode: modeArray, };
    if (this.isEditing) {
      if (!this.service.currentpackageId) return;
      // console.log("current id", this.service.currentpackageId);
      this.service.updateTransport(this.service.currentpackageId, body).subscribe({
        next: () => {
          this.nextStep();
          this.notifier.notify('success', 'Form Details Successfully Updated!');

        },
        error: (err: any) => {
          this.notifier.notify('error', 'Update transport failed!......');
        }
      });
    } else {
      if (!this.currentId) return;
      this.service.saveTransport(body, this.currentId).subscribe({
        next: (res) => {
          // console.log("✅ Transport saved:", res);
          this.loadPackagesMonth(this.currentId);
          this.notifier.notify('success', 'Form Details Successfully Uploaded!');
          this.nextStep();
        },
        error: (err) => {
          // console.error("❌ Transport save failed:", err);
          // alert("Save transport failed. Please try again.");
          this.notifier.notify('error', 'Save transport failed!......');

        }
      });
    }
  }


  // ******************************** emd data in the db ***************************

  deletePackage(id: number) {
    if (confirm('Are you sure to delete this package?')) {
      this.service.deletePackage(id).subscribe(() => {
        this.notifier.notify('success', ' Tour Package Successfully Deleted....');
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