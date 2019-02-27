import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesServicioPage } from './ajustes-servicio.page';

describe('AjustesServicioPage', () => {
  let component: AjustesServicioPage;
  let fixture: ComponentFixture<AjustesServicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjustesServicioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustesServicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
