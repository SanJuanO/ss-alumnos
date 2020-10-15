import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosEditComponent } from './proyectos-edit.component';

describe('OrganizationAddComponent', () => {
  let component: ProyectosEditComponent;
  let fixture: ComponentFixture<ProyectosEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectosEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
