import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDeskboard } from './vendor-deskboard';

describe('VendorDeskboard', () => {
  let component: VendorDeskboard;
  let fixture: ComponentFixture<VendorDeskboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorDeskboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorDeskboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
