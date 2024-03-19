import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { UserService } from './user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService {

  constructor(private router: Router, private userServ: UserService) {
    this.userService = userServ;
  }
  userService: UserService

  handleError(err: any) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {

    const token = localStorage.getItem("token")
    if (token) {
      const decoded_token: { [key: string]: string } = jwtDecode(token);
      return new Observable<boolean>((observer) => {
        this.userService.getUser(decoded_token['id']).pipe(
          catchError((error: HttpErrorResponse) => {
            // Attempt token refresh
            this.userService.refreshToken().subscribe(refreshToken => {
              if (refreshToken) {
                localStorage.setItem("token", refreshToken.token);
                localStorage.setItem("refreshtoken", refreshToken.refreshToken);
                // Retry fetching user after token refresh
                observer.next(true);
                observer.complete();
              } else {
                this.router.navigate(["user", "login"]);
                observer.next(false);
                observer.complete();
              }
            });
            return throwError(() => new Error('User not logged'));
          })
        ).subscribe((user) => {
          this.userService.user = new User(user)
          observer.next(true);
          observer.complete();
        });
      });
    } else {
      this.router.navigate(["user", "login"]);
      return false;
    }
  }
}
