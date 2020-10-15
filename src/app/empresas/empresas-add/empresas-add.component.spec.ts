import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasAddComponent } from './empresas-add.component';

describe('OrganizationAddComponent', () => {
  let component: EmpresasAddComponent;
  let fixture: ComponentFixture<EmpresasAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresasAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
