import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Venderform } from './venderform';

describe('Venderform', () => {
  let component: Venderform;
  let fixture: ComponentFixture<Venderform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Venderform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Venderform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
