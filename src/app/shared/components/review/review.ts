import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-review',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './review.html',
  styleUrl: './review.scss'
})
export class Review {
  showGuestsModal: boolean = false;
  step: number = 1;

  // For storing current range numbers (like 1–10, 11–20…)
  currentRange: number[] = [];

  // Final selected guest number
  totalGuests: number | null = null;

  // Pagination
  currentPage: number = 0;
  rangesPerPage: number = 9;
  allRanges: { start: number, end: number }[] = [];
  totalPages: number = 0;

  // Animation flag
  isAnimating: boolean = false;

  constructor() {
    // Pre-generate ranges (1–20, 21–40, ... up to 1000 for demo)
    for (let i = 1; i <= 1000; i += 20) {
      this.allRanges.push({ start: i, end: i + 19 });
    }

    // Calculate total pages based on ranges
    this.totalPages = Math.ceil(this.allRanges.length / this.rangesPerPage);
  }

  toggleGuestsModal() {
    this.showGuestsModal = !this.showGuestsModal;
    this.step = 1;
    this.currentPage = 0;
  }

  /** Step 1: Select Range */
  selectRange(start: number, end: number) {
    this.currentRange = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    this.step = 2;
  }

  /** Step 2: Select Number */
  selectNumber(num: number) {
    this.totalGuests = num;
    this.toggleGuestsModal();
  }

  /** Pagination with simple animation */
  nextPage() {
    if ((this.currentPage + 1) * this.rangesPerPage < this.allRanges.length) {
      this.triggerPageChange(() => this.currentPage++);
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.triggerPageChange(() => this.currentPage--);
    }
  }

  /** Trigger animation and change page */
  private triggerPageChange(changeFn: Function) {
    this.isAnimating = true;
    setTimeout(() => {
      changeFn();
      this.isAnimating = false;
    }, 80);
  }

  /** Get paged ranges */
  get pagedRanges() {
    const start = this.currentPage * this.rangesPerPage;
    return this.allRanges.slice(start, start + this.rangesPerPage);
  }
}