import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NrealComponent } from './nreal.component';

describe('NrealComponent', () => {
  let component: NrealComponent;
  let fixture: ComponentFixture<NrealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NrealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NrealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
