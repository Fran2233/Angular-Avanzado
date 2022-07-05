import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const header = new HttpHeaders({
      'token-fran': 'ASDASDASDSADSADASDSAD'
    });

    const reqClone = req.clone({
      headers: header
    });


    return next.handle(reqClone).pipe(
      catchError(this.manejarError)
    );

  }

  manejarError(error: HttpErrorResponse) {
    console.log('error: ');
    console.warn(error);
    return throwError(() => new Error('TEST!!'))

  }



}
