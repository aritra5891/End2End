import { AuthService } from './../service/auth.service';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, tap, catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class UserInterceptor implements HttpInterceptor {

    constructor(private router: Router, private auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let requestURL = request.url;
        if(requestURL.indexOf('users') > 1) {
            let token = this.auth.userToken;
            if (token) {
                const customReq = request.clone({
                    setHeaders: {
                        'Authorization': 'Bearer: ' + token,
                    },
                });
                return next.handle(customReq).pipe(
                    catchError((error: HttpErrorResponse) => {
                        console.log(error);
                        let errorMessage = '';
                        if (error.status === 400) {
                            errorMessage = `Error: ${error.error.message}`;
                            //modal
                        } else if (error.status === 403) {
                            errorMessage = `Error: ${error.error}`;
                            //modal
                        }
                        return throwError(errorMessage);
                    })
                )
            }
        }
        return next.handle(request);
    }

}