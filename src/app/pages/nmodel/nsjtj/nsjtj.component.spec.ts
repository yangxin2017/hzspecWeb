import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsjtjComponent } from './nsjtj.component';

describe('NsjtjComponent', () => {
  let component: NsjtjComponent;
  let fixture: ComponentFixture<NsjtjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsjtjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsjtjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
