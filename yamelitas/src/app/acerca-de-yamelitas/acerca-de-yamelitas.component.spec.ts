import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcercaDeYamelitasComponent } from './acerca-de-yamelitas.component';

describe('AcercaDeYamelitasComponent', () => {
  let component: AcercaDeYamelitasComponent;
  let fixture: ComponentFixture<AcercaDeYamelitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcercaDeYamelitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcercaDeYamelitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
