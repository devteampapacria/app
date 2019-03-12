import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkErrorPage } from './network-error.page';

describe('NetworkErrorPage', () => {
  let component: NetworkErrorPage;
  let fixture: ComponentFixture<NetworkErrorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkErrorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkErrorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
