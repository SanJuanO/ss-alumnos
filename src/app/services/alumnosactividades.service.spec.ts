import { TestBed } from '@angular/core/testing';

import { AlumnosActividadesServices } from './alumnosactividades.service';

describe('AlumnosActividadesServices', () => {
  let service: AlumnosActividadesServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlumnosActividadesServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
