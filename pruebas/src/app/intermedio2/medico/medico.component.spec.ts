import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoComponent } from './medico.component';
import { MedicoService } from './medico.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing'

describe('MedicoComponent', () => {

  let component: MedicoComponent;
  let fixture: ComponentFixture<MedicoComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [MedicoComponent],
      providers: [MedicoService],
      imports: [HttpClientModule, HttpClientTestingModule]
    });

    fixture = TestBed.createComponent(MedicoComponent);
    component = fixture.componentInstance;

  });


  it('Debe de crearse el componente', () => {

    expect(component).toBeTruthy();

  });


  it('Debe de retornar name del medico', () => {

    const nombre = 'juan';


    const mensaje = component.saludarMedico(nombre);


    expect(mensaje).toContain(nombre);


  });
});
