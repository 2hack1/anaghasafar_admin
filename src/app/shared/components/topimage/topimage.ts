import { Component, OnInit } from '@angular/core';
import { UserServices } from '../../../core/services/user-services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-topimage',
  imports: [CommonModule,FormsModule],
  templateUrl: './topimage.html',
  styleUrl: './topimage.scss'
})
export class Topimage  implements OnInit{
 cards: any;
  selectedCard: any = null;
  selectedImage: File | null = null;
  //  imageId:any;
  constructor(private service: UserServices) {}

  ngOnInit(): void {
    this.getCards();
  }

  getCards(): void {
    this.service.gettopimage().subscribe((res) => {
      this.cards = res;
      console.log(res)
    });
  }

  editCard(card: any): void {
    this.selectedCard = { ...card };
    console.log("card details",this.selectedCard);
    this.selectedImage = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  saveCard(): void {
    if (!this.selectedImage || !this.selectedCard) return;

    const imageData = new FormData();
      imageData.append('image', this.selectedImage);
    imageData.append('dest',"slider");

   
    this.service.updatetopimage(this.selectedCard.id,imageData).subscribe(() => {
      alert('Image updated!');
      this.selectedCard = null;
      this.getCards();
    });
  }

  cancelEdit(): void {
    this.selectedCard = null;
    this.selectedImage = null;
  }
}
