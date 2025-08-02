import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelVendorForm } from './hotel-vendor-form';

describe('HotelVendorForm', () => {
  let component: HotelVendorForm;
  let fixture: ComponentFixture<HotelVendorForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelVendorForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelVendorForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
