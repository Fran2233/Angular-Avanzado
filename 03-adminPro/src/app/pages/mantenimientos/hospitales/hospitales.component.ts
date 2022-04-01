import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription, delay } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit,OnDestroy {

  public hospitales: Hospital[] = [];

  public hospitalesTemp: Hospital[] = [];

  public cargando: boolean = true;

  public totalHospitales: number = 0;

  public pagActual: number = 0;

  private imgSubs!:Subscription;

  constructor(private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedasService) { }


    ngOnDestroy(): void {
      this.imgSubs.unsubscribe();
    }

  ngOnInit(): void {
    this.cargarHospitales();

    // sirve para cuando cambio la imagen se actualize la pagina
    this.imgSubs =  this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(res => {
      this.cargarHospitales()
    });

  }


  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales(this.pagActual)
      .subscribe(({ total, hospitales }) => {
        this.cargando = false
        this.totalHospitales = total;
        this.hospitalesTemp = hospitales;
        this.hospitales = hospitales;
        console.log(hospitales);

      });
  }

  cambiarPagina(valor: number) {
    this.pagActual += valor;

    if (this.pagActual < 0) {
      this.pagActual = 0;
    } else if (this.pagActual >= this.totalHospitales) {

      this.pagActual -= valor
    }

    this.cargarHospitales();
  }


  guardarCambios(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe(res => {
        Swal.fire('Guardado', hospital.nombre, 'success')
      })

  }

 //TODO: implementar cartel de confirmacion al borrar
  borrarHospital(hospital: Hospital) {
    this.hospitalService.borrarHospital(hospital._id)
      .subscribe(res => {
        Swal.fire('Borrado', hospital.nombre, 'success');
        this.cargarHospitales();
      })

  }

  async abrirCrearHospital() {

    const { value = '' } = await Swal.fire<string>({

      input: 'text',
      inputLabel: 'Ingrese nombre del nuevo Hospital',
      inputPlaceholder: 'Nombre hospital',
      showCancelButton: true,
    })

    if (value!.trim().length > 0) {
      this.hospitalService.crearHospital(value!)
        .subscribe(res => {
          Swal.fire('Hospital creado!', '', 'success');
          this.cargarHospitales();
          console.log(res);

        })
    }



  }




  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
    
  }



  
  buscar(termino: string) {
// Cuando borro lo que busque vuelve a lo que estaba anteriormente
    if (termino.length === 0) {
      return this.hospitales = this.hospitalesTemp;
    }

    return this.busquedaService.buscar('hospitales', termino)
      .subscribe(res => {
        this.hospitales = res
      });

  }

}
