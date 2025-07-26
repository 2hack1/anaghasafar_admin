import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelVendorHeader } from './hotel-vendor-header';

describe('HotelVendorHeader', () => {
  let component: HotelVendorHeader;
  let fixture: ComponentFixture<HotelVendorHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelVendorHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelVendorHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
