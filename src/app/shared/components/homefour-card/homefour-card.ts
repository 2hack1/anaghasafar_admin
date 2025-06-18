import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserServices } from '../../../core/services/user-services';
import { NotifierModule, NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-homefour-card',
  standalone: true, // assuming this is a standalone component
  imports: [CommonModule, FormsModule,NotifierModule],
  templateUrl: './homefour-card.html',
  styleUrls: ['./homefour-card.scss'] // fixed `styleUrl` to `styleUrls`
})
export class HomefourCard implements OnInit {
  cards: any ;
  selectedCard: any = null;
  car:any;
   id:any;
  constructor(private service: UserServices,
    private readonly notifier:NotifierService) {}

  ngOnInit(): void {
    this.getcards();
  }
  
  editCard(card: any): void {
    this.selectedCard = { ...card };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  saveCard(): void {
    console.log("cards", this.selectedCard);
    this.car={ 
      heading:this.selectedCard.heading,
      headingData:this.selectedCard.headingData,
    }
    this.id=this.selectedCard.id,
    this.updatecard(this.car,this.id);
    
    
  }
  updatecard(data:any,id:any){
    
    this.service.update4card(id,data).subscribe((res)=>{
      console.log("its working");
      this.selectedCard = null;
      
      this.notifier.notify('success','card has been Successfully updated!.....');
       this.getcards();
    })
  }

  cancelEdit(): void {
    this.selectedCard = null;
  }

  getcards(): void {
    this.service.get4card().subscribe((res) => {
      this.cards = res;
    });
  }
}
