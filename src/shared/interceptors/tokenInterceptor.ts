import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import { AppConsts } from '../AppConsts';

@Injectable()
export class TokenInterceptor {
    // constructor(private tokenService:TokenService) {}

    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     const headers = req.headers
    //         .set('Authorization',`Bearer ${this.tokenService.getToken()}`)
    //       const authReq = req.clone({ headers });
    //     return next.handle(authReq).pipe(tap((event: HttpEvent<any>) => {
    //         if (event instanceof HttpResponse) {
    //           // do stuff with response if you want
    //         }
    //       }, (err: any) => {
    //         if (err instanceof HttpErrorResponse) {
    //           if (err.status === 401) {
    //             location.href = AppConsts.loginUrl;
    //           }
    //         }
    //       }));
    // }
}   