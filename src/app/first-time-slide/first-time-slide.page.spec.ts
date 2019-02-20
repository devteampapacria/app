import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimeSlidePage } from './first-time-slide.page';

describe('FirstTimeSlidePage', () => {
  let component: FirstTimeSlidePage;
  let fixture: ComponentFixture<FirstTimeSlidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstTimeSlidePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstTimeSlidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
