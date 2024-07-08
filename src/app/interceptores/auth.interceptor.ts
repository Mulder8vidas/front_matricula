import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    try {

      const newBody = request.clone({
        setHeaders: {
          Authorization: 'Bearer '+ (localStorage.getItem('token') || sessionStorage.getItem('token') || ''),
        },
      });





      return next.handle(newBody).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 401 || error.status == 422) {
            localStorage.clear();
            sessionStorage.clear();
            this.router.navigate(['']).then(r => {

            });
          }

          return throwError(() => error);
        })
      );
    }catch (e){

      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/']).then(value => {

      })
      return next.handle(request);
    }
  }
}
