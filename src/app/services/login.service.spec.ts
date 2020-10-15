import { TestBed } from '@angular/core/testing';

import { LoginServices } from './login.service';

describe('LoginServices', () => {
  let service: LoginServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
