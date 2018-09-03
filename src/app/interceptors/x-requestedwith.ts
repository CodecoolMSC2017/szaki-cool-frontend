import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class XRequestedWithInterceptor implements HttpInterceptor {

  constructor(private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedReq = req.clone({ setHeaders: {'X-Requested-With': 'XMLHttpRequest'} });
    return next.handle(clonedReq).pipe(tap((event: HttpEvent<any>) => {}, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status == 401) {
          sessionStorage.clear();
          this.router.navigate(['/login']);
        }
      }
    }));
  }
} 