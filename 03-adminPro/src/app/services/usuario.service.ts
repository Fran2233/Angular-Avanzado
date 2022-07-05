import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, Observable, catchError, of, delay } from 'rxjs';
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


  get role(): 'ADMIN_ROLE' | 'USER_ROLE'{
    return this.usuario.role!;
  }


  get uid() {
    return this.usuario.uid || '';
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
          client_id: '621404926166-ehfnfhmm5ltue7ulcmloh8fbk1li34ll.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',

        });
        resolve();
      });

    })

  }


  saveLocalStorage(token:string,menu:any){
    localStorage.setItem('token', token)
    localStorage.setItem('menu', JSON.stringify(menu))
  }



  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
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
          this.saveLocalStorage(res.token, res.menu);
        })
      );
  }



  //////////LOGIN////////////

  login(formData: LoginForm) {

    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((res: any) => {
          this.saveLocalStorage(res.token, res.menu);
        })
      );

  }

  //////////LOGIN GOOGLE////////////

  loginGoogle(token: any) {

    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((res: any) => {
          this.saveLocalStorage(res.token, res.menu);
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
        this.saveLocalStorage(res.token, res.menu);
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
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    })


  }




  cargarUsuarios(desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        delay(1000),
        map(res => {

          const usuarios = res.usuarios.map(user => new Usuario(
            user.nombre, user.email, '', user.img, user.google, user.role, user.uid));


          return {
            total: res.total,
            usuarios
          }
        })
      )
  }



  borrarUsuario(usuario: Usuario) {

    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);



  }



  guardarUsuario(usuario: Usuario) {


    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, {
      headers: {
        'x-token': this.token
      }
    })


  }
}
