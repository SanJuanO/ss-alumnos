import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosAddComponent } from './proyectos-add.component';

describe('ProyectosAddComponent', () => {
  let component: ProyectosAddComponent;
  let fixture: ComponentFixture<ProyectosAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectosAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
