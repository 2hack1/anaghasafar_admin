import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hotelbooking } from './hotelbooking';

describe('Hotelbooking', () => {
  let component: Hotelbooking;
  let fixture: ComponentFixture<Hotelbooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hotelbooking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hotelbooking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
