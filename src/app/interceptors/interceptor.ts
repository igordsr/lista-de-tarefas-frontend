import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show()
    const header: HttpHeaders = this.setRequestHeader(request);
    const httpsReq = request.clone({
      headers: header
    });

    return next.handle(httpsReq).pipe(
      finalize(() => this.spinner.hide())
    );
  }

  private setRequestHeader(request: HttpRequest<any>): HttpHeaders {
    return request.headers.set("Content-Type", "application/json");
  }
}
