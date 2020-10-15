import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosAlumnosAddComponent } from './proyectos-add.component';

describe('ProyectosActividadesAddComponent', () => {
  let component: ProyectosAlumnosAddComponent;
  let fixture: ComponentFixture<ProyectosAlumnosAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProyectosAlumnosAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosAlumnosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
