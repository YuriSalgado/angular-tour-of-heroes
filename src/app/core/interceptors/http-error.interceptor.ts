import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessagesService } from '../services/messages.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessagesService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (!environment.production) {
          console.log(err);
        }

        let errorMsg = '';

        if (err.error instanceof ErrorEvent) {
          errorMsg = `Error: ${err.message}`;
        } else if (Array.isArray(err.error) && err.error.length) {
          errorMsg = `Error: ${err.error[0]}`;
        } else if (err.error.errors) {
          errorMsg = `Error: ${err.error.errors}`;
        } else {
          errorMsg = `Error Code: ${err.status}, Message: ${err.message}`;
        }

        this.messageService.add(errorMsg);
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
