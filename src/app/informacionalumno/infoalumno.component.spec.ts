import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAlumnoComponent } from './infoalumno.component';

describe('InfoAlumnoComponent', () => {
  let component: InfoAlumnoComponent;
  let fixture: ComponentFixture<InfoAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfoAlumnoComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
