import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/model/iUser';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService {

  
  constructor(private userServ: UserService){
    this.userService = userServ;
    
    const token = localStorage.getItem("token")
    if(token){
      this.decoded_token = jwtDecode(token)
    }else{
      this.decoded_token = {}
    }
  }

  decoded_token: { [key: string]: string }
  userService: UserService

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<IUser | undefined> {
      const userId = this.decoded_token["id"]
      return this.userService.getUser(userId)
    }
}
