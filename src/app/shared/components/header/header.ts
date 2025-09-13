import { Component, OnInit } from '@angular/core';
import { UserServices } from '../../../core/services/user-services';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../core/services/auth';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  template: `<button (click)="toggleTarget()">Toggle</button>`,
})
export class Header implements OnInit {



  public isMobileView: boolean = true;
  name: any;

  ngOnInit(): void {
    this.name = sessionStorage.getItem('name')
  }


  constructor(private user1: UserServices, private auth: Auth) { }

  toggleTarget() {
    // this.togel=!this.togel;
    this.isMobileView = !this.isMobileView;
    console.log(this.isMobileView);

    // this.user.toggle();
  }


  allSubs: any = {
    1: [{ id: 101, name: 'MP' }, { id: 102, name: 'UP' }],
    2: [{ id: 201, name: 'California' }]
  };


  allPackages: any = {
    101: [{ name: 'Gwalior' }, { name: 'Indore' }],
    102: [{ name: 'Agra' }, { name: 'Varanasi' }],
    201: [{ name: 'Los Angeles' }, { name: 'San Francisco' }]
  };
  logoutt() {
    this.auth.logout();
  }

  // Editing methods
  user = { name: 'Admin Name', email: 'admin123@example.com' };
  isEditing = false;

  editName = '';
  editEmail = '';

  startEdit() {
    this.isEditing = true;
    this.editName = this.user.name;
    this.editEmail = this.user.email;
  }

  saveEdit() {
    console.log('Name:', this.editName);
    console.log('Email:', this.editEmail);
    this.user.name = this.editName;
    this.user.email = this.editEmail;

    this.isEditing = false;
  }
  cancelEdit() {
    this.isEditing = false;
  }


  // modal for notification
  showMessagesModal = false;
  openMessagesModal() {
    this.showMessagesModal = true;
  }
  closeMessagesModal() {
    this.showMessagesModal = false;
  }
} 