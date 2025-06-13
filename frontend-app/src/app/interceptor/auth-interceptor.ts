import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private toast: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('userToken');

    if (!token) return next.handle(req);

    const reqCloned = this.cloneReq(token, req);

    return next.handle(reqCloned).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status !== 401) return throwError(() => err);

        const refreshToken: string | null =
          localStorage.getItem('refreshToken');

        if (!refreshToken) this.onError(err);

        return this.authService.refreshToken(refreshToken ?? '').pipe(
          switchMap((accessToken) => {
            localStorage.setItem('userToken', accessToken);
            const restoredReq = this.cloneReq(accessToken, req);

            return next.handle(restoredReq);
          }),
          catchError((error: HttpErrorResponse) => this.onError(error))
        );
      })
    );
  }

  private cloneReq(userToken: string, req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${userToken}`,
      },
    });
  }

  private clearLocalStorage(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
    localStorage.removeItem('refreshToken');
  }

  private redirectToLoginPage(): void {
    this.router.navigateByUrl('/');
    this.toast.info('Your session has expired');
  }

  private onError(error: HttpErrorResponse): Observable<any> {
    this.clearLocalStorage();
    this.redirectToLoginPage();

    return throwError(() => error);
  }
}
