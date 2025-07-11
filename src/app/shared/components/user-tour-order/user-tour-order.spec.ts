import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTourOrder } from './user-tour-order';

describe('UserTourOrder', () => {
  let component: UserTourOrder;
  let fixture: ComponentFixture<UserTourOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTourOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTourOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
