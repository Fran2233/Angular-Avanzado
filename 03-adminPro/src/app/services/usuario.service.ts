import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;
declare const gapi: any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;


  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {
    this.googleInit();
  }





  googleInit() {

    return new Promise<void>(resolve => {
      gapi.load('auth2', () => {

        this.auth2 = gapi.auth2.init({
          client_id: '621404926166-k5rtt0fab2r6ebv9o50jimcdldcrmql4.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',

        });
        resolve();
      });

    })

  }



  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });

  }

  //////////crear user////////////
  crearUsuario(formData: RegisterForm) {


    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token)
        })
      );
  }



  //////////LOGIN////////////

  login(formData: LoginForm) {

    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token)
        })
      );

  }



  loginGoogle(token: any) {

    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token)
        })
      );

  }



  //////////////////VALIDAR TOKENN////////////////////////

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token)
      }),
      map(res => true),
      catchError(error => of(false))
    );
  }
}
