import { Injectable } from "@angular/core";
import { 
  HttpEvent, HttpInterceptor, HttpHandler,
  HttpRequest, HttpHeaders
} from "@angular/common/http";
import {  Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = '';
    if(sessionStorage.getItem('loggedUserToken') !== null && sessionStorage.getItem('loggedUserToken') !== undefined ){
      token = sessionStorage.getItem('loggedUserToken');
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
  });

    req = req.clone({
        headers: headers
      });

      return next.handle(req);
  }
}