import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NheadComponent } from './nhead.component';

describe('NheadComponent', () => {
  let component: NheadComponent;
  let fixture: ComponentFixture<NheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
