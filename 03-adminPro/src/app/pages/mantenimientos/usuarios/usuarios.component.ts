import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;

  public pagActual: number = 0;

  public usuarios: Usuario[] = [];

  public usuariosTemp: Usuario[] = [];

  public cargando: boolean = true;

  public imgSubs!: Subscription;

  constructor(private usuarioService: UsuarioService,
    private busquedaService: BusquedasService,
    private modalService: ModalImagenService) { }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    console.log(this.usuarioService.uid);

   this.imgSubs =  this.modalService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(res => {
        this.cargarUsuarios()
      });

  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.pagActual)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      })
  }

  cambiarPagina(valor: number) {
    this.pagActual += valor;

    if (this.pagActual < 0) {
      this.pagActual = 0;
    } else if (this.pagActual >= this.totalUsuarios) {

      this.pagActual -= valor
    }

    this.cargarUsuarios();
  }


  buscar(termino: string) {

    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }

    return this.busquedaService.buscar('usuarios', termino)
      .subscribe((res:any) => {
        this.usuarios = res
      });

  }



  borrarUsuario(usuario: Usuario): void {

    if (usuario.uid === this.usuarioService.uid) {
      Swal.fire('Error', 'No puedes borrarte a ti mismo', 'error');
    } else {

      Swal.fire({
        title: '¿Borrar usuario?',
        text: `Sera borrado ${usuario.nombre}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar'
      }).then((result) => {
        if (result.isConfirmed) {


          this.usuarioService.borrarUsuario(usuario)
            .subscribe(res => {
              Swal.fire(
                'Deleted!',
                `Usuario ${usuario.nombre} borrado!`,
                'success');

              this.cargarUsuarios();
            }

            )
        }
      })
    }

  }


  cambiarRole(usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario)
      .subscribe(res => {
        console.log(res);
        this.cargarUsuarios();
      })

  }


  abrirModal(usuario: Usuario) {
    this.modalService.abrirModal('usuarios', usuario.uid, usuario.img);
  }




}


