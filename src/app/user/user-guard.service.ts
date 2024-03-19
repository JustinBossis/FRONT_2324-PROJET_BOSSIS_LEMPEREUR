import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService {

  constructor(private router: Router, private userServ: UserService) {
    this.userService = userServ;
  }
  userService: UserService

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ):  Observable<boolean> | Promise<boolean> | UrlTree | boolean {

      const token = self.localStorage.getItem("token")
      if(token){
        const decoded_token: { [key: string]: string }  = jwtDecode(token);
        return new Promise((resolve) => {
          this.userService.getUser(decoded_token['id']).subscribe(user => {
            if(user){
              resolve(true);
            }else{
              resolve(new Promise((resolve2) => {
                this.userService.refreshToken().subscribe(refreshToken => {
                  if(refreshToken){
                    self.localStorage.setItem("token", refreshToken.token)
                    self.localStorage.setItem("refreshtoken", refreshToken.refreshToken)
                    resolve2(true)
                  }else{
                    this.router.navigate(["user", "login"])
                    resolve2(false)
                  }
                });
              }));
            }
          });
        });
      }
      this.router.navigate(["user", "login"])
      return true;

    }
}
