import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPackage } from './about-package';

describe('AboutPackage', () => {
  let component: AboutPackage;
  let fixture: ComponentFixture<AboutPackage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPackage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutPackage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
