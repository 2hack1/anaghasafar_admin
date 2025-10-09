import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesTermsPolicyes } from './des-terms-policyes';

describe('DesTermsPolicyes', () => {
  let component: DesTermsPolicyes;
  let fixture: ComponentFixture<DesTermsPolicyes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesTermsPolicyes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesTermsPolicyes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
