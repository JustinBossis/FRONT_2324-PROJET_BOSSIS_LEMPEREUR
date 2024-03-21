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

  //Attributs
  userService: UserService

  //Constructeur
  //Récupération du service nécessaire pour la gestion des utilisateurs et du router pour la navigation
  constructor(private router: Router, private userServ: UserService) {
    this.userService = userServ;
  }

  //Méthodes
  //canActivate est appelé lors de la navigation vers une page et permet de vérifier si l'utilisateur est connecté
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {

    // Récupération du token dans le localStorage
    const token = localStorage.getItem("token")
    if (token) {
      // Décodage du token
      const decoded_token: { [key: string]: string } = jwtDecode(token);
      // Récupération de l'utilisateur
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
          // Stockage de l'utilisateur dans le service
          this.userService.user = new User(user)
          observer.next(true);
          observer.complete();
        });
      });
    } else {
      // Redirection vers la page de connexion
      this.router.navigate(["user", "login"]);
      return false;
    }
  }
}
