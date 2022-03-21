import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'
  ]
})
export class RegisterComponent implements OnInit {


  formSubmitted = false;


  registerForm = this.fb.group({

    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: [false, Validators.required]

  },
    {
      validator: this.passwordsIguales('password', 'password2')
    });


  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router) { }


  crearUsuario() {
    this.registerForm.markAllAsTouched();
    this.formSubmitted = true;
    console.log(this.registerForm);
    if (this.registerForm.invalid) {
      return;

    }
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(res => {
        console.log('usuariocreado!')
        this.router.navigateByUrl('/');
      }, (err) => {
        // si hay error
        Swal.fire('Error', err.error.msg, 'error')
      });
  }

  ngOnInit(): void {
  }


  campoNoValido(campo: string) {

    if (this.registerForm.get(campo)?.invalid && this.registerForm.get(campo)?.touched) {
      return true;
    } else {
      return false;
    }
  }


  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted
  }


  passwordsNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    return pass1 === pass2 ? false : true;

  }

  passwordsIguales(campo1: string, campo2: string) {

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(campo1);
      const pass2Control = formGroup.get(campo2);

      if (pass1Control!.value === pass2Control!.value) {
        pass2Control?.setErrors(null)
      } else {
        pass2Control?.setErrors({ noEsIgual: true })
      }
    }



  }



}
