import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  public menu:any[] = []

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')!);
  }
  // menu: any[] = [

  //   {
  //     titulo: 'Dashboard',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       {
  //         titulo: 'Grafica',
  //         url: 'grafica1'
  //       },
  //       {
  //         titulo: 'Main',
  //         url: '/'
  //       },
  //       {
  //         titulo: 'ProgressBar',
  //         url: 'progress'
  //       },
  //       {
  //         titulo: 'Promesas',
  //         url: 'promesas'
  //       },
  //       {
  //         titulo: 'Rxjs',
  //         url: 'rxjs'
  //       },
  //       {
  //         titulo: 'Perfil',
  //         url: 'perfil'
  //       },
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {
  //         titulo: 'Usuarios',
  //         url: 'usuarios'
  //       },
  //       {
  //         titulo: 'Hospitales',
  //         url: 'hospitales'
  //       },
  //       {
  //         titulo: 'Medicos',
  //         url: 'medicos'
  //       },
  //     ]
  //   },


  // ];




  




}
