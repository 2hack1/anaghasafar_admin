import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminhotelinfo } from './adminhotelinfo';

describe('Adminhotelinfo', () => {
  let component: Adminhotelinfo;
  let fixture: ComponentFixture<Adminhotelinfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adminhotelinfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adminhotelinfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
