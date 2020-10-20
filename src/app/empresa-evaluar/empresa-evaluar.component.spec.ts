import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaevaluarComponent } from './empresa-evaluar.component';

describe('AlumnosverComponent', () => {
  let component: EmpresaevaluarComponent;
  let fixture: ComponentFixture<EmpresaevaluarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaevaluarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaevaluarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
