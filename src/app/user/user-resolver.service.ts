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

  //Attributs
  decoded_token: { [key: string]: string }
  userService: UserService
  
  //Constructeur
  //Récupération du service nécessaire pour la gestion des utilisateurs
  constructor(private userServ: UserService){
    this.userService = userServ;
    // Récupération du token dans le localStorage
    const token = localStorage.getItem("token")
    if(token){
      this.decoded_token = jwtDecode(token)
    }else{
      this.decoded_token = {}
    }
  }

  //Méthodes
  //resolve est appelé lors de la navigation vers une page d'utilisateur et permet de récupérer l'utilisateur correspondant à l'id passé en paramètre
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<IUser | undefined> {
      // Récupération de l'id de l'utilisateur
      const userId = this.decoded_token["id"]
      return this.userService.getUser(userId)
    }
}
