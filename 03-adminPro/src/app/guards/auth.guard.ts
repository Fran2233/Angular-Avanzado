import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable,tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private usuariService: UsuarioService,
    private router:Router){

  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.usuariService.validarToken()
    .pipe(
      tap((autenticado:any) =>{
        if(!autenticado){
          this.router.navigateByUrl('/login')
        }
      })
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

      
    return this.usuariService.validarToken()
    .pipe(
      tap((autenticado:any) =>{
        if(!autenticado){
          this.router.navigateByUrl('/login')
        }
      })
    );
  }
  
}
