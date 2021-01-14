import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProyectosVerComponent } from './proyectos-ver.component';

describe('ProyectosVerComponent', () => {
  let component: ProyectosVerComponent;
  let fixture: ComponentFixture<ProyectosVerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectosVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
