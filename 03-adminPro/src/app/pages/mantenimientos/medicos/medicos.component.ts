import { Component, OnInit, OnDestroy } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;

  public medicos: Medico[] = [];

  public medicosTemp: Medico[] = [];

  public totalMedicos: number = 0;

  public pagActual: number = 0;


  private imgSubs!: Subscription;

  constructor(private medicoService: MedicoService,
    private busquedaService: BusquedasService,
    private modalImagenService: ModalImagenService) { }




  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

    // sirve para cuando cambio la imagen se actualize la pagina
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(res => {
        this.cargarMedicos()
      });
  }


  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos(this.pagActual)
      .subscribe(({ total, medicos }) => {
        this.cargando = false;
        this.medicos = medicos;
        this.medicosTemp = medicos;
        this.totalMedicos = total;
      });
  }



  cambiarPagina(valor: number) {
    this.pagActual += valor;

    if (this.pagActual < 0) {
      this.pagActual = 0;
    } else if (this.pagActual >= this.totalMedicos) {

      this.pagActual -= valor
    }

    this.cargarMedicos();
  }


  buscar(termino: string) {
    // Cuando borro lo que busque vuelve a lo que estaba anteriormente
    if (termino.length === 0) {
      return this.medicos = this.medicosTemp;
    }

    return this.busquedaService.buscar('medicos', termino)
      .subscribe(res => {
        this.medicos = res
      });

  }



  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);

  }


  borrarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Sera borrado ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {


        this.medicoService.borrarMedico(medico._id)
          .subscribe(res => {
            Swal.fire(
              'Deleted!',
              `Usuario ${medico.nombre} borrado!`,
              'success');

            this.cargarMedicos();
          }

          )
      }
    })
  }
}


