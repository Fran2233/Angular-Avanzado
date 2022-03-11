import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy{


  public titulo: string = '';
  public tituloSubs$: Subscription;

  constructor(private router: Router) {

this.tituloSubs$ = this.getData()
                  .subscribe(({ titulo }) => {
                  this.titulo = titulo;
});


  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  ngOnInit(): void {
  }



  getData() {

    return this.router.events
      .pipe(
        filter((event: any) => 
          event instanceof ActivationEnd &&
          event.snapshot.firstChild === null),
        map((event: any) => event.snapshot.data)
      );
     
  }





}
