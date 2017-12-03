import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EyljComponent } from './eylj.component';

describe('EyljComponent', () => {
  let component: EyljComponent;
  let fixture: ComponentFixture<EyljComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EyljComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EyljComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
