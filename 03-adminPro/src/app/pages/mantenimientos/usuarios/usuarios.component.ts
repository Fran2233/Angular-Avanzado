import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios:number = 0;

  public pagActual:number = 0;

  public usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.usuarioService.cargarUsuarios(this.pagActual)
    .subscribe(({total, usuarios}) =>{
      this.totalUsuarios = total;
      this.usuarios = usuarios;

    })
  }

  cambiarPagina(valor:number){
    this.pagActual += valor;

    if(this.pagActual < 0){
      this.pagActual = 0;
    }else if(this.pagActual >= this.totalUsuarios){
      
      this.pagActual -= valor
    }

    this.cargarUsuarios();  }

}
