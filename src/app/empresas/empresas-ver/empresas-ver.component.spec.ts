import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmpresasverComponent } from './empresas-ver.component';

describe('OrganizationAddComponent', () => {
  let component: EmpresasverComponent;
  let fixture: ComponentFixture<EmpresasverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresasverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
