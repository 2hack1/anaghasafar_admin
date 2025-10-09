import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationHotelBookingShow } from './destination-hotel-booking-show';

describe('DestinationHotelBookingShow', () => {
  let component: DestinationHotelBookingShow;
  let fixture: ComponentFixture<DestinationHotelBookingShow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationHotelBookingShow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationHotelBookingShow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
