import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent {

  
  @Input()btnClass:string = 'btn btn-primary';
  @Input()progress:number = 50;

  @Output()valorSalida: EventEmitter<number> = new EventEmitter;



  get porcentaje(){
    return `${this.progress}%`;
  }

 cambiarValor(valor:number){


    if(this.progress >= 100 && valor >= 0){
      this.valorSalida.emit(100);
      return;
     
    }

    if(this.progress <= 0 && valor < 0){
      this.valorSalida.emit(0);
      return;
     
    }

    this.progress = this.progress +valor;
    this.valorSalida.emit(this.progress);
  }


  onChange(event : number ){
    if(event >= 100){
      this.progress = 100;
    }else if(event <= 0){
      this.progress = 0;
    }else {
      this.progress = event;
    }

this.valorSalida.emit(this.progress);

  }
}
