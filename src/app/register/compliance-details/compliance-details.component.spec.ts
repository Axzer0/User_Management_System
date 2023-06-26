import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceDetailsComponent } from './compliance-details.component';

describe('ComplianceDetailsComponent', () => {
  let component: ComplianceDetailsComponent;
  let fixture: ComponentFixture<ComplianceDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComplianceDetailsComponent]
    });
    fixture = TestBed.createComponent(ComplianceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
