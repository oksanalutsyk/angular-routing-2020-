import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class ProductsInterceptor implements HttpInterceptor {

  baseUrl: string;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (req.url === 'products/') {
      this.baseUrl = 'http://localhost:3000/';
    }

    const clonedRequest = req.clone({ url: `${this.baseUrl}${req.url}` });

    return next.handle(clonedRequest);
  }
}
