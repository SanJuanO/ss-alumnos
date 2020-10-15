import { TestBed } from '@angular/core/testing';

import { UsuarioServices } from './usuario.service';

describe('ConvocatoriaServices', () => {
  let usuario: UsuarioServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    usuario = TestBed.inject(UsuarioServices);
  });

  it('should be created', () => {
    expect(usuario).toBeTruthy();
  });
});
