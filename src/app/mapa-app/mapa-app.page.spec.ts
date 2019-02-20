import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaAppPage } from './mapa-app.page';

describe('MapaAppPage', () => {
  let component: MapaAppPage;
  let fixture: ComponentFixture<MapaAppPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaAppPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
