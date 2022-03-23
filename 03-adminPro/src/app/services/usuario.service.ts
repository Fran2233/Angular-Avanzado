import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

const base_url = environment.base_url;
declare const gapi: any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  usuario!: Usuario;


  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }


  get uid() {
    return this.usuario.udi || '';
  }


  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
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

  //////////LOGIN GOOGLE////////////

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


    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((res: any) => {
        console.log(res);
        const {
          email,
          google,
          img,
          nombre,
          role,
          uid,
        } = res.usuario;
        this.usuario = new Usuario(
          nombre,
          email,
          '',
          img,
          google,
          role,
          uid
        );
        localStorage.setItem('token', res.token);
        return true
      }),

      catchError(error => of(false))
    );
  }


  //////////////////ACTUALIZAR USER////////////////////////
  updateProfile(data: { emai: string, nombre: string, role: any }) {

    data = {
      ...data,
      role: this.usuario.role
    };

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    })


  }




  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers);
  }
}
