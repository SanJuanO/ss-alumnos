import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosActividadesAddComponent } from './proyectos-add.component';

describe('ProyectosActividadesAddComponent', () => {
  let component: ProyectosAddComponent;
  let fixture: ComponentFixture<ProyectosActividadesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProyectosActividadesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosActividadesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
