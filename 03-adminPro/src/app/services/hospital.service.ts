import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, Observable, delay } from 'rxjs';
import { Hospital } from '../models/hospital.model';
import { CargarHospital } from '../interfaces/cargar-hospital';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {




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



  cargarHospitales(desde: number = 0) {
    const url = `${base_url}/hospitales?desde=${desde}`;
    return this.http.get<CargarHospital>(url, this.headers)
      .pipe(
        delay(1000),
        map(res => {

          const hospitales = res.hospitales;

          return {
            total: res.total,
            hospitales
          }
        })
      )

  }



  crearHospital(nombre: string) {
    const url = `${base_url}/hospitales`;
    return this.http.post(url, { nombre }, this.headers);
  }




  

  actualizarHospital(_id: any, nombre: string) {
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.put(url, { nombre }, this.headers);
  }





  borrarHospital(_id: any) {
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
