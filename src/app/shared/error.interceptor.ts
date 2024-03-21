import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  //Constructeur
  //Récupération du service nécessaire pour la gestion des erreurs
  constructor(private errorService: ErrorService) {}

  //Méthodes
  //intercept est appelé lors de l'envoi d'une requête et permet de gérer les erreurs
  //Les erreurs sont affichées dans le composant ErrorComponent grace  au service ErrorService
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap(() => this.errorService.clearError()),
      catchError((error: HttpErrorResponse) => {
        this.errorService.setError(error.error.message);
        return throwError(error);
      })
    );
  }
}
