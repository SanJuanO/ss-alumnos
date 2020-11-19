import { TestBed } from '@angular/core/testing';

import { ModalidadesTrabajoService } from './modalidadestrabajo.service';

describe('ModalidadesTrabajoService', () => {
  let service: ModalidadesTrabajoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalidadesTrabajoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
