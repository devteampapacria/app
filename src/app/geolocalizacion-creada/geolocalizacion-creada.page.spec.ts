import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocalizacionCreadaPage } from './geolocalizacion-creada.page';

describe('GeolocalizacionCreadaPage', () => {
  let component: GeolocalizacionCreadaPage;
  let fixture: ComponentFixture<GeolocalizacionCreadaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeolocalizacionCreadaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocalizacionCreadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
