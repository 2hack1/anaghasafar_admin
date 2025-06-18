import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { UserServices } from '../../../core/services/user-services';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-destination',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './destination.html',
  styleUrl: './destination.scss'
})

export class Destination implements OnInit {
  subDestForm: FormGroup;
  formVisible = false;
  isEditing = false;
  selectedFile: File | null = null;
  allSubDestinations: any[] = [];
  destinations: any[] = [];
  searchText = '';
  currentId: number | null = null;
  // subdes_id:any;

  constructor(private fb: FormBuilder, private service: UserServices, private route: ActivatedRoute,private router:Router) {

    this.subDestForm = this.fb.group({
      name: ['', Validators.required],
      sub_dest: [Validators.required],
      sub: [],
      image: ['']
    });
  }
  des_id: any;
  ngOnInit(): void {
    this.des_id = this.route.snapshot.paramMap.get('id');
    console.log("dest_id:", this.des_id);
    this.loadSubDestinations(this.des_id);
  }
  // getall:any;
  destination: any;
  loadSubDestinations(id: any) {
    this.service.getAllSubDestinations(id).subscribe((res: any) => {
      this.allSubDestinations = res.sub_destinations;
      this.destination = res.name;
      console.log("allSubDestination:", this.allSubDestinations)
    });
  }
   send(entry:any){
      console.log('Navigating to ID:', entry.sub_destination_id);
    if (entry?.sub_destination_id) {
    console.log('Navigating to ID:', entry.id);
    this.router.navigate(['/packages', entry.sub_destination_id]);  // Cleaner and more reliable
    
  } else {
    console.warn('Invalid entry:', entry);
  }
   }

  showForm(edit = false, data?: any) {
    this.formVisible = true;
    this.isEditing = edit;
    this.selectedFile = null;
    if (edit && data) {
      this.currentId = data.sub_destination_id;
      // console.log("current Id:",this.currentId);
      this.subDestForm.patchValue({
        name: data.name,
        // sub_dest: data.sub_dest

      });
    } else {
      this.currentId = null;
      this.subDestForm.reset();
    }
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  save() {
    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    //  console.log(formData);
    if (this.isEditing && this.currentId) {
      // formData.append('_method', "PUT");
      formData.append('name', this.subDestForm.value.name);

      this.service.updateSubDestination(this.currentId, formData).subscribe((data) => {
        console.log(data)
        this.loadSubDestinations(this.des_id);
        this.formVisible = false;
      });
    } else {
      formData.append('name', this.subDestForm.value.name);
      formData.append('destination_id', this.subDestForm.value.sub_dest);
      this.service.createSubDestination(formData, this.des_id).subscribe(() => {
        this.loadSubDestinations(this.des_id);
        this.formVisible = false;
      });
    }
  }

  deleteSubDest(id: number) {
    if (confirm('Are you sure to delete this sub destination?')) {
      console.log(id);
      this.service.deleteSubDestination(id).subscribe(() => {
        this.loadSubDestinations(this.des_id);
      });
    }
  }

  get filteredSubDestinations() {
    return this.allSubDestinations.filter(d =>
      d.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}




