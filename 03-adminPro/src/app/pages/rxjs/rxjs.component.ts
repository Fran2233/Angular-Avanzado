import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, retry, interval, take, map,filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {



  intevalSubs!: Subscription;



  constructor() {


    // this.getObservable()
    //   .pipe(
    //     retry()
    //   )
    //   .subscribe(
    //     valor => console.log('Subs', valor),
    //     (err) => console.warn('Error', err),
    //     () => console.info('obs terminado')


    //   );


    this.intevalSubs = this.retornaInterval().subscribe(console.log)

  }
  ngOnDestroy(): void {
    this.intevalSubs.unsubscribe();
  }

  ngOnInit(): void {
  }


  retornaInterval() {
    
    return  interval(500)
      .pipe(
        map(valor => {
          return valor + 1;
        }),
        filter(valor => (valor % 2 === 0) ? true : false),
        // take(10),
        // puedo extraer solo lo que me interesa
      )
  }


  getObservable() {

    let i = 0;
    return new Observable<number>(observer => {

      const intervalo = setInterval(() => {

        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          observer.error('i llego a 2')
        }


      }, 1000)

    });



  }








}
