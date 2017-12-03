import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NinforComponent } from './ninfor.component';

describe('NinforComponent', () => {
  let component: NinforComponent;
  let fixture: ComponentFixture<NinforComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NinforComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NinforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
