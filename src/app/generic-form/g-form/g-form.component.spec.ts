import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GFormComponent } from './g-form.component';

describe('GFormComponent', () => {
  let component: GFormComponent;
  let fixture: ComponentFixture<GFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GFormComponent]
    });
    fixture = TestBed.createComponent(GFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
