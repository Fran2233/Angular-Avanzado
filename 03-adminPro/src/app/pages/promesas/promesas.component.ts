import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {




  constructor() { }

  ngOnInit(): void {
    this.getUsers().then(usuarios => {
      console.log(usuarios)
    })
  //   const promesa = new Promise( (resolve, reject) =>{


  //     if(false){
  //       resolve('hola');

  //     }else{
  //       reject('salio mal');
  //     }


  //   } );


  //   promesa.then((res) => {
  //     console.log(res)
  //   }).catch(error => console.log('error promsesa', error))
  // }
  }

  getUsers(){

    // fetch('https://reqres.in/api/users?page=2')
    // .then(res => {
    //   res.json().then(body => console.log(body))
    // })

    const promesa =  new Promise(resolve => {
        fetch('https://reqres.in/api/users?page=2')
          .then(res => res.json() )
          .then(body => resolve(body.data))
    });
return promesa;
  

  }




}
