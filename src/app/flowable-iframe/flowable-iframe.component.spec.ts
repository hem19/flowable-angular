import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowableIframeComponent } from './flowable-iframe.component';

describe('FlowableIframeComponent', () => {
  let component: FlowableIframeComponent;
  let fixture: ComponentFixture<FlowableIframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowableIframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowableIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
