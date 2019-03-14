import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CerrarSesionPage } from './cerrar-sesion.page';

describe('CerrarSesionPage', () => {
  let component: CerrarSesionPage;
  let fixture: ComponentFixture<CerrarSesionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CerrarSesionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CerrarSesionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
