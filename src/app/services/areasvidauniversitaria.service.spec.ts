import { TestBed } from '@angular/core/testing';

import { AreasVidaUniversitariaService } from './areasvidauniversitaria.service';

describe('AreasVidaUniversitariaService', () => {
  let service: AreaVidaUniversitariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreasVidaUniversitariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
