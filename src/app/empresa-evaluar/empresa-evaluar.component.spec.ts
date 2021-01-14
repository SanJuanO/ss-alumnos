import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmpresaevaluarComponent } from './empresa-evaluar.component';

describe('AlumnosverComponent', () => {
  let component: EmpresaevaluarComponent;
  let fixture: ComponentFixture<EmpresaevaluarComponent>;

  beforeEach(waitForAsync(() => {
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
