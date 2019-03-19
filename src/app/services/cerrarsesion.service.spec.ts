import { TestBed } from '@angular/core/testing';

import { CerrarsesionService } from './cerrarsesion.service';

describe('CerrarsesionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CerrarsesionService = TestBed.get(CerrarsesionService);
    expect(service).toBeTruthy();
  });
});
