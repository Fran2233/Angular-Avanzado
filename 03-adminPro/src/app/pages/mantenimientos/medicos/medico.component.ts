import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {


  public medicoForm!: FormGroup;

  public hospitales: Hospital[] = [];

  public medicoSelected!: Medico;

  public hospitalSelected!: any;

  constructor(private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activateRoute.params.subscribe(({ id }) => {
      this.cargarMedico(id);

    })



    this.cargarHospitales(-1);


    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    })


    this.medicoForm.get('hospital')?.valueChanges
      .pipe(
        delay(100)
      )
      .subscribe(id => {
        this.hospitalSelected = this.hospitales.find(hospital => hospital._id === id);
      })

  }


  cargarMedico(id: string) {


    if (id === 'nuevo') {
      return;
    }

    this.medicoService.getMedicoById(id)
      .pipe(
        delay(1000)
      )
      .subscribe(medico => {
        if (!medico) {
          this.router.navigateByUrl(`/dashboard/medicos`);
        }
        const { nombre, hospital } = medico;

        this.medicoSelected = medico;
        this.medicoForm.setValue({ nombre, hospital: hospital?._id });

        console.log(this.hospitalSelected);


      })
  }

  cargarHospitales(value: number) {

    this.hospitalService.cargarHospitales(value)
      .subscribe(({ hospitales }) => {

        this.hospitales = hospitales;

      })


  }


  guardarMedico() {


    if (this.medicoSelected) {


      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSelected._id
      }
      this.medicoService.actualizarMedico(data)
      .subscribe(res =>{
        console.log(res);
        
        Swal.fire('Editado', 'editado con exito', 'success');
      })

    } else {
      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe((res: any) => {
          console.log(res);
          Swal.fire('Creado', 'se creo medico', 'success');
          this.router.navigateByUrl(`/dashboard/medico/${res.medico._id}`)
        })

    }


  }

}
