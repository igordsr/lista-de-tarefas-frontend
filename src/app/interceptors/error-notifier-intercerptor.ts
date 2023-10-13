import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, Observable, of, tap } from 'rxjs';

import { ToastService } from '../services/toast.service';
import { ToastType } from '../models/toast-modal';


@Injectable({
  providedIn: 'root'
})
export class ErrorNotifierIntercerptorService implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService, private _toastService: ToastService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    return next.handle(request.clone()).pipe(
      tap((obj: any) => {
        //console.log(obj)
      }),
      catchError((error: HttpErrorResponse) => this.validateHttpStatusCode(error)),
      finalize(() => this.spinner.hide())
    );
  }

  private validateHttpStatusCode(error: HttpErrorResponse): Observable<any[]> {
    switch (error.status) {
      case HttpStatusCode.Conflict:
        this._toastService.show(error.error.message, ToastType.Error);
        break;
      default:
        break;
    }
    return of([]);
  }


}
