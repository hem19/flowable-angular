import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveLeaveFormComponent } from './approve-leave-form.component';

describe('ApproveLeaveFormComponent', () => {
  let component: ApproveLeaveFormComponent;
  let fixture: ComponentFixture<ApproveLeaveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveLeaveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveLeaveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
