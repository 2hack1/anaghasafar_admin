import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationFormComponent } from './cancellation-form-component';

describe('CancellationFormComponent', () => {
  let component: CancellationFormComponent;
  let fixture: ComponentFixture<CancellationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancellationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancellationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
