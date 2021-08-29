import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePrescriptionPopupComponent } from './delete-prescription-popup.component';

describe('DeletePrescriptionPopupComponent', () => {
  let component: DeletePrescriptionPopupComponent;
  let fixture: ComponentFixture<DeletePrescriptionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeletePrescriptionPopupComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture   = TestBed.createComponent(DeletePrescriptionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
