import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmpresasEditComponent } from './empresas-edit.component';

describe('OrganizationAddComponent', () => {
  let component: EmpresasEditComponent;
  let fixture: ComponentFixture<EmpresasEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresasEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
