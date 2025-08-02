import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelTeck } from './hotel-teck';

describe('HotelTeck', () => {
  let component: HotelTeck;
  let fixture: ComponentFixture<HotelTeck>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelTeck]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelTeck);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
