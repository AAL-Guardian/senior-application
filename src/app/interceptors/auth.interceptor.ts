import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { InstallationService } from '../services/installation.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private installationService: InstallationService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.installationService.getData()?.token) {
      request = request.clone({
        setHeaders: {
          authorization: 'Bearer ' + this.installationService.getData()?.token
        }
      })
    }
    return next.handle(request);
  }
}
