import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomefourCard } from './homefour-card';

describe('HomefourCard', () => {
  let component: HomefourCard;
  let fixture: ComponentFixture<HomefourCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomefourCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomefourCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
