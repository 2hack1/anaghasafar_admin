import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePlaneNewTrip } from './home-plane-new-trip';

describe('HomePlaneNewTrip', () => {
  let component: HomePlaneNewTrip;
  let fixture: ComponentFixture<HomePlaneNewTrip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePlaneNewTrip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePlaneNewTrip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
