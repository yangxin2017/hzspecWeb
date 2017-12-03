import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlbtjComponent } from './nlbtj.component';

describe('NlbtjComponent', () => {
  let component: NlbtjComponent;
  let fixture: ComponentFixture<NlbtjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlbtjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlbtjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
