import { Component, OnInit } from '@angular/core';
import { MedicoService } from './medico.service';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  constructor(public _medicosService: MedicoService) { }

medicos:any[] = [];

  ngOnInit(): void {
  }
  saludarMedico(nombre:string){
    return `hola${nombre}`;
  }

  getMedicos(){
    this._medicosService.getMedicos()
    .subscribe((medicos:any) => this.medicos = medicos)
  }

}
