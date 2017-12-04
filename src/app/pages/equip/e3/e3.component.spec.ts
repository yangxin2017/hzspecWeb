import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { E3Component } from './e3.component';

describe('E3Component', () => {
  let component: E3Component;
  let fixture: ComponentFixture<E3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ E3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(E3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
