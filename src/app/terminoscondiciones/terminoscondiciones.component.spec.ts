import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TerminosCondicionesComponent } from './terminoscondiciones.component';

describe('TerminosCondicionesComponent', () => {
  let component: TerminosCondicionesComponent;
  let fixture: ComponentFixture<TerminosCondicionesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TerminosCondicionesComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminosCondicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
