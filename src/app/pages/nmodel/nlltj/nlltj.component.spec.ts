import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlltjComponent } from './nlltj.component';

describe('NlltjComponent', () => {
  let component: NlltjComponent;
  let fixture: ComponentFixture<NlltjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlltjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlltjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
