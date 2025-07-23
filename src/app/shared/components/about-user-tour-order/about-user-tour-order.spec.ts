import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUserTourOrder } from './about-user-tour-order';

describe('AboutUserTourOrder', () => {
  let component: AboutUserTourOrder;
  let fixture: ComponentFixture<AboutUserTourOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutUserTourOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutUserTourOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
