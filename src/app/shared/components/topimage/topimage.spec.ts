import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Topimage } from './topimage';

describe('Topimage', () => {
  let component: Topimage;
  let fixture: ComponentFixture<Topimage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Topimage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Topimage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
