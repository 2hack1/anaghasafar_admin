import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelPolicy } from './hotel-policy';

describe('HotelPolicy', () => {
  let component: HotelPolicy;
  let fixture: ComponentFixture<HotelPolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelPolicy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelPolicy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
