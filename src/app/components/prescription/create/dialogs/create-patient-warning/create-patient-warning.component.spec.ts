import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePatientWarningComponent } from './create-patient-warning.component';

describe('CreatePatientWarningComponent', () => {
  let component: CreatePatientWarningComponent;
  let fixture: ComponentFixture<CreatePatientWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePatientWarningComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture   = TestBed.createComponent(CreatePatientWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
