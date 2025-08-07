import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRoomDetails } from './show-room-details';

describe('ShowRoomDetails', () => {
  let component: ShowRoomDetails;
  let fixture: ComponentFixture<ShowRoomDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowRoomDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowRoomDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
