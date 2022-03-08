import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input()titulo:string = '';
  @Input()data:number[]= [];
  
  constructor() { }

  ngOnInit(): void {
  }

  
  @Input('labels')doughnutChartLabels!: string[] ;
  @Input('data1') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ] },
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

}
