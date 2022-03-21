import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'
  ]
})
export class LoginComponent implements OnInit {


  formSubmitted = false;
  public auth2: any;

  loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required]],
    password: ['', Validators.required],
    remember: [false]
  });





  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone) { }

  ngOnInit(): void {

    this.renderButton();

  }

  campoNoValido(campo: string):boolean {

    if (this.loginForm.get(campo)?.invalid && this.loginForm.get(campo)?.touched) {
      return true;
    } else {
      return false;
    }
  }


  login() {

    this.usuarioService.login(this.loginForm.value)
      .subscribe(res => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value)
          console.log(res);
        } else {
          localStorage.removeItem('email');
        }
        console.log('logeado!!!!');
        this.router.navigateByUrl('/');


      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      });

      this.loginForm.markAllAsTouched();



    // this.router.navigateByUrl('/');
  }

  //  onSuccess(googleUser:any) {
  //   // console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  //   var id_token = googleUser.getAuthResponse().id_token;
  //   console.log(id_token);

  // }


  // onFailure(error:any) {
  //   console.log(error);
  // }


  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  }




  async startApp() {
    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));
  };



  attachSignin(element: any) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        var id_token = googleUser.getAuthResponse().id_token;
        // console.log(id_token);
        this.usuarioService.loginGoogle(id_token).subscribe(res => {
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          });
        });
        console.log('logeado!');


      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });

  }
}
