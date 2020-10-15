import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresashomeComponent } from './empresas-home.component';

describe('StudentProjectsComponent', () => {
  let component: EmpresashomeComponent;
  let fixture: ComponentFixture<EmpresashomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresashomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresashomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
