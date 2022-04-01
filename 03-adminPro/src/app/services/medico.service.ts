import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CargarMedico } from '../interfaces/cargar-medicos.interface';
import { delay, map } from 'rxjs';
import { Medico } from '../models/medico.model';
import { CargarMedicoById } from '../interfaces/cargarMedicoById.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient) { }


  get token(): string {
    return localStorage.getItem('token') || '';
  }




  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }



  cargarMedicos(desde: number = 0) {
    const url = `${base_url}/medicos?desde=${desde}`;
    return this.http.get<CargarMedico>(url, this.headers)
      .pipe(
        delay(1000),
        map(res => {

          const medicos = res.medicos;

          return {
            total: res.total,
            medicos
          }
        })
      )

  }



  getMedicoById(id:string){
    const url = `${base_url}/medicos/${id}`;
    return this.http.get<CargarMedicoById>(url,this.headers)
    .pipe(
      map((res:{ok:boolean,medico:Medico}) => res.medico)
    )
  }



  crearMedico(medico: {nombre:string, hospital:string}) {
    const url = `${base_url}/medicos`;
    return this.http.post(url, medico, this.headers);
  }






  actualizarMedico(medico: Medico) {
    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put(url, medico, this.headers);
  }





  borrarMedico(_id: any) {
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
