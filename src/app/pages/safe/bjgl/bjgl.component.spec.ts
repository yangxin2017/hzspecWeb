import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BjglComponent } from './bjgl.component';

describe('BjglComponent', () => {
  let component: BjglComponent;
  let fixture: ComponentFixture<BjglComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BjglComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BjglComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
