import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }


  getUsuarios() {

    let params = new HttpParams().append('page', '1');
    params = params.append('nombre', 'frann!');



    return this.http.get(`https://reqres123.in/api/user`, {
      params: params
    }).pipe(
      map((res: any) => {
        console.log(res.data);
      }),

    )
  }


}
