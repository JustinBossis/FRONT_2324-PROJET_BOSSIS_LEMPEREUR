import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/model/iUser';

@Injectable({
  providedIn: 'root'
})
export class ChatResolverService {

  constructor(private userServ: UserService){
    this.userService = userServ;
  }

  userService: UserService

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<IUser[] | undefined> {
      return this.userService.getAllUsers()
    }
}
