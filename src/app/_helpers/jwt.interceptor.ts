import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, } from 'rxjs/operators';

@Injectable()
export class JwtInterceptors implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = request;
    const token = localStorage.getItem('accessToken');
    if (token) {
      authReq = this.addTokenHeader(request, token);
    }
    return next.handle(authReq).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
        return throwError(error);
      }));
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    if (request.url.includes('/getAccessToken')) {
      return request;
    } else {
      return request.clone(
        {
          headers: request.headers.set('Authorization', 'Bearer ' + token)
        }
      );
    }
  }
}
