import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { E2Component } from './e2.component';

describe('E2Component', () => {
  let component: E2Component;
  let fixture: ComponentFixture<E2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ E2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(E2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
