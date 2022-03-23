import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public profileForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = '';





  constructor(private fb: FormBuilder,
    private userService: UsuarioService,
    private fileUploadService: FileUploadService) {

    this.usuario = this.userService.usuario;

  }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [, Validators.required, Validators.email]]
    });
  }



  updateProfile() {
    console.log(this.profileForm.value);
    this.userService.updateProfile(this.profileForm.value)
      .subscribe(res => {
        const { nombre, email } = this.profileForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire('Guardado', 'Cambios guardados!', 'success');
      }, (err) => {
        Swal.fire('Error!', err.error.msg, 'error');
      });
  }



  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();

    const url64 = reader.readAsDataURL(file);

    return reader.onloadend = () => {
      
      this.imgTemp = reader.result;
    }
  }



  subirImagen() {
    this.fileUploadService
    .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.udi!)
      .then(res => {
        this.usuario.img = res,
          Swal.fire('Imagen actualizada!', '', 'success');
      }).catch(err => {
        console.log(err);
        console.log('errroooor');
        
        Swal.fire('Error!', err.error.msg, 'error');
      });
  }
}


