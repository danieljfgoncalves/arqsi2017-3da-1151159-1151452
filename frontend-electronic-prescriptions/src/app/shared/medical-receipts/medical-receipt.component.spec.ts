import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalReceiptComponent } from './medical-receipt.component';

describe('MedicalReceiptComponent', () => {
  let component: MedicalReceiptComponent;
  let fixture: ComponentFixture<MedicalReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
