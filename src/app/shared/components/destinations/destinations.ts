import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { UserServices } from '../../../core/services/user-services';
import { Router, RouterLink } from '@angular/router';

interface AdminEntry {
   id?: number;
  name: string;
  type: string;
}

@Component({
  selector: 'app-destinations',
  imports: [FormsModule,CommonModule],
  templateUrl: './destinations.html',
  styleUrl: './destinations.scss'
})
export class Destinations {
 entries: AdminEntry[] = [];
  formVisible = false;
  isEditing = false;
  formData: AdminEntry = { name: '', type: '' };

  constructor(private adminService: UserServices,private route: Router) {}

  ngOnInit() {
    this.loadData();
  }
  
  sendId(entry: AdminEntry):void {
  if (entry?.id) {
    console.log('Navigating to ID:', entry.id);
    this.route.navigate(['/sub-des', entry.id]);  // Cleaner and more reliable
  } else {
    console.warn('Invalid entry:', entry);
  }

  }

  loadData() {
    this.adminService.getAll().subscribe((data: any[]) => {
    this.entries = data.map(d => ({
      id: d.destination_id, // map it
      name: d.name,
      type: d.type
    }));
  });
  }

  showForm(editing: boolean = false, entry?: AdminEntry) {
    this.formVisible = true;
    this.isEditing = editing;
    if (editing && entry) {
      console.log('Editing entry:', entry); // DEBUG
    this.formData = { ...entry }; // ensure id is preserved
    } else {
      this.formData = { name: '', type: '' };
    }
  }

  saveEntry() {
    if (this.isEditing && this.formData.id) {
      this.adminService.update(this.formData.id, this.formData).subscribe(() => {
        this.loadData();
        this.formVisible = false;
      });
    } else {
      this.adminService.create(this.formData).subscribe(() => {
        this.loadData();
        this.formVisible = false;
      });
    }
  }

  
  deleteEntry(entry: AdminEntry) {
    if (entry.id && confirm('Are you sure you want to delete this entry?')) {
      this.adminService.delete(entry.id).subscribe(() => this.loadData());
    }
  }
}
