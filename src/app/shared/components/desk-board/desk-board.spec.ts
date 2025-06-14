import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskBoard } from './desk-board';

describe('DeskBoard', () => {
  let component: DeskBoard;
  let fixture: ComponentFixture<DeskBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeskBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeskBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
