import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir!: File;
  public imgTemp: any = '';

  constructor(public modalImagenService: ModalImagenService,
    private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }



  cerrarModal() {
    this.modalImagenService.cerrarModal();
    this.imgTemp = null;
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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
      .actualizarFoto(this.imagenSubir, tipo, id)
      .then(img => {
        Swal.fire('Imagen actualizada!', '', 'success');
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      }).catch(err => {
        console.log(err);
        console.log('errroooor');

        Swal.fire('Error!', err.error.msg, 'error');
      });
  }

}
