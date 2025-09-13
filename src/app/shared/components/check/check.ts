
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServices } from '../../../core/services/user-services';


@Component({
  selector: 'app-check',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check.html',
  styleUrls: ['./check.scss']
})


export class check implements OnInit {
  constructor(private route: Router, private a: UserServices) { }
  ngOnInit(): void {

    this.getRoomsData();
  }

  getRoomsData() {
  }
  mainImage = 'https://r1imghtlak.mmtcdn.com/62365a361c3111eca17e0a58a9feac02.jfif';
  thumbnails = [
    'https://r1imghtlak.mmtcdn.com/ff0e99a8717b11e99c800242ac110003.jpeg',
    'https://r1imghtlak.mmtcdn.com/91dfae0c717c11e98c720242ac110002.jpeg',
    'https://r1imghtlak.mmtcdn.com/28afb82a077f11eaa5450242ac110003.jpg',
  ];
  thumbnails1 = [
    'https://r1imghtlak.mmtcdn.com/ecc7073b-c80d-4f9b-967a-20d9a0b58069.PNG',
    'https://r1imghtlak.mmtcdn.com/70fc6fd7-74f5-445d-9aa3-73988542c67f.jpg',
    'https://r1imghtlak.mmtcdn.com/e5c0b654-f785-4f9f-b8f4-fc3c1645e199.jpg',

  ];
  thumbnails2 = [
    'https://r1imghtlak.mmtcdn.com/8ea919dc32fd11ebb7c00242ac110004.jfif',
    'https://r1imghtlak.mmtcdn.com/a0b4d350f01711ebbe000a58a9feac02.jpg',
    'https://r1imghtlak.mmtcdn.com/a3becd42bc8311ec91b40a58a9feac02.jpg',

  ];
  thumbnails3 = [
    'https://r1imghtlak.mmtcdn.com/bff9988b-a9be-4a1e-9979-aeee68cf613d.JPG',
    'https://r1imghtlak.mmtcdn.com/62e97b74-4e5f-488c-a3e2-d1b6b1e3e111.JPG',
    'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201905081714483043-04f26f93-9627-4529-bea3-660de6e3e020.jpg',

  ];

  thumbnails4 = [
    'https://r1imghtlak.mmtcdn.com/a10f963872e611e98f050242ac110004.jpeg',
    'https://r1imghtlak.mmtcdn.com/dd5ca37e72e611e9b0040242ac110004.jpeg',
    'https://r1imghtlak.mmtcdn.com/ae1efe8af01711eba53b0a58a9feac02.jpg',

  ];
  thumbnails5 = [
    'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/flyfish/raw/NH73101379206610/QS1042/QS1042-Q1/1000013403.jpg',
    'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/flyfish/raw/NH72053377099770/QS1042/QS1042-Q1/1549523735707219.jpeg',
    'https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/flyfish/raw/NH71011374778096/QS1042/QS1042-Q1/496690776210897.jpeg',

  ];

  roomTitle = 'Couple Room  Queen Bed';
  description = 'A spacious deluxe room perfect for couples and families.';
  basePrice = 5000;
  bedType = 'Queen Size';
  bookingStatus = 'Available';
  cancellationPolicy = 'Free cancellation within 24 hours';
  cancellationCharges = 550;
  checkInTime = '2:00 PM';
  checkOutTime = '11:00 AM';
  createdAt = new Date();
  discount = 10;
  extraBedCharges = 500;
  finalPrice = '1000';
  hotel_roomId = 2;
  hotel_vendor_id = "7777";
  maxAdults = 34;
  maxChildrens = 3;
  numRooms = 10;
  numberofBeds = 20;
  roomType = "Super Delux";
  rooms_image = Array(3)
  0 = "https://r1imghtlak.mmtcdn.com/ff0e99a8717b11e99c800242ac110003.jpeg";
  1 = "https://r1imghtlak.mmtcdn.com/ff0e99a8717b11e99c800242ac110003.jpeg";
  2 = "https://r1imghtlak.mmtcdn.com/ff0e99a8717b11e99c800242ac110003.jpeg";
  taxIncluded = true;
  updated_at = "2025-08-04T07:54:16.0000000Z"

  amenities = ['WiFi', 'Air Conditioning', 'TV', 'Mini Fridge', 'Room Service'];

  updateMainImage(image: string) {
    this.mainImage = image;
  }

  roomDetails = [
    { label: 'Booking Status', value: 'Available' },
    { label: 'Check-In', value: '2:00 PM' },
    { label: 'Check-Out', value: '11:00 AM' },
    { label: 'Cancellation', value: 'Free Cancellation Within 24 Hours' },
    { label: 'Cancellation Charges', value: '₹500' },
    { label: 'Discount', value: '10%' },
    { label: 'Extra Bed Charges', value: '₹700' },
    { label: 'Final Price', value: '₹341.00' },
    { label: 'Hotel Room ID', value: '1' },
    { label: 'Hotel Vendor ID', value: '1222' },
    { label: 'Max Adults', value: '344' },
    { label: 'Max Children', value: '3' },
    { label: 'Number of Rooms', value: '33' },
    { label: 'Number of Beds', value: '1' },
    { label: 'Room Type', value: 'Delux' },
    { label: 'Rooms Image', value: 'Image URL or -' },
    { label: 'Tax Included', value: 'True' },
    { label: 'Updated At', value: '2025-08-04T07:54:16.000Z' }
  ];

}
