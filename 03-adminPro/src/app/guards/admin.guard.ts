import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private usuariService: UsuarioService, private router:Router) {

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {


    if(this.usuariService.role === 'ADMIN_ROLE'){
      return true;
    }else{
      this.router.navigateByUrl('/dashboard');
      return false;
    }


    // return (this.usuariService.role === 'ADMIN_ROLE') ? true : false;
  }

}
