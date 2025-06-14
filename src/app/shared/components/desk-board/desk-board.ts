import { Component, OnInit } from '@angular/core';
import { UserServices } from '../../../core/services/user-services';

@Component({
  selector: 'app-desk-board',
  imports: [ ],
  templateUrl: './desk-board.html',
  styleUrl: './desk-board.scss'
})
export class DeskBoard implements OnInit {
  
  
  
  ngOnInit(): void {
  
  }

constructor(private as_:UserServices){}
 
}
