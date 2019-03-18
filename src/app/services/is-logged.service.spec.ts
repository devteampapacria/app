import { TestBed } from '@angular/core/testing';

import { IsLoggedService } from './is-logged.service';

describe('IsLoggedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsLoggedService = TestBed.get(IsLoggedService);
    expect(service).toBeTruthy();
  });
});
