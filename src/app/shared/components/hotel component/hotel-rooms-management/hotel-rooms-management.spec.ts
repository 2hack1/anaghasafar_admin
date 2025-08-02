import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelRoomsManagement } from './hotel-rooms-management';

describe('HotelRoomsManagement', () => {
  let component: HotelRoomsManagement;
  let fixture: ComponentFixture<HotelRoomsManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelRoomsManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelRoomsManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
