import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LdsmComponent } from './ldsm.component';

describe('LdsmComponent', () => {
  let component: LdsmComponent;
  let fixture: ComponentFixture<LdsmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LdsmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
