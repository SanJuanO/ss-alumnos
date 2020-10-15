import { TestBed } from '@angular/core/testing';

import { ConvocatoriaServices } from './convocatoria.service';

describe('ConvocatoriaServices', () => {
  let service: ConvocatoriaServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvocatoriaServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
