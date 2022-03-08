import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'
  ]
})
export class ProgressComponent  {
  


  progress1:number =25;
  progress2:number =35;

  get progreso1(){
    return `${this.progress1}%`
  }
  
  get progreso2(){
    return `${this.progress2}%`
  }



}
