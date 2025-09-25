import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBackDetails } from './vendor-back-details';

describe('VendorBackDetails', () => {
  let component: VendorBackDetails;
  let fixture: ComponentFixture<VendorBackDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorBackDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorBackDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
